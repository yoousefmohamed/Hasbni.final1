import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === 'MY_GEMINI_API_KEY' || key.trim() === '') {
      throw new Error('GEMINI_API_KEY is not configured in environment variables.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// API Routes registered first
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AI Chatbot endpoint proxying Gemini
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, language } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const currentLanguage = language === 'en' ? 'English' : 'Arabic';

    const systemInstruction = `
You are the advanced interactive AI assistant for "Barmegny" (برمجني) - a world-class premium software development agency.
The agency is owned and led by Eng. Youssef Balah (م. يوسف بلح), a leading professional specializing in designing and implementing high-performance systems.

Your key expertise includes:
1. Smart Accounting Software (برامج المحاسبة الذكية) - double-entry systems, VAT compliance, electronic invoicing, audit reports.
2. Cloud & Local ERP systems (أنظمة ERP السحابية والمحلية) - managing HR, finance, supply chain, multi-branch warehouses.
3. POS & Cashier systems (أنظمة الكاشير ونقاط البيع) - optimized for retail, supermarkets, restaurants, cafes (kitchen displays, table map, recipe costs, delivery).
4. Custom Medical Systems (إدارة العيادات والصيدليات) - patient records (EMR), chemical substitutes, expiry tracking, appointment grids.
5. Modern Web Development & E-Commerce (المواقع والمتاجر الإلكترونية) - responsive, fast, SEO-semantic Next.js/React code.
6. Custom Mobile apps, desktop applications (Windows/macOS), and custom AI workflows and automation.

Your Guidelines:
- You must speak in a professional, polite, helpful, and highly convincing tech consulting tone.
- Answer in the same language the user queried you in (${currentLanguage}), with elegant phrasing.
- Give real advice about their business. If they ask about accounting or cashier systems, explain how Eng. Youssef Balah implements bespoke solutions using ASP.NET Core 9 Web API, SQL Server, and React to ensure secure, high-speed, and reliable workflows.
- Always gently prompt the user to use the "Order a Project" wizard page on the website or connect directly with Eng. Youssef Balah via WhatsApp to receive a personalized pricing proposal.
- Keep answers relatively concise and highly readable (use bullet points if needed).
    `.trim();

    try {
      const ai = getGeminiClient();
      
      // We can use chat mode
      const chat = ai.chats.create({
        model: 'gemini-3.5-flash',
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      // Prepare history if provided
      if (history && Array.isArray(history)) {
        // Map history to previous turns if supported or handle via contextual messaging
        // To be safe and simple with @google/genai, we can initialize and pass message
      }

      const response = await chat.sendMessage({ message });
      const text = response.text || '';
      
      return res.json({ reply: text });
    } catch (apiError: any) {
      console.warn('Gemini API connection error/missing key:', apiError?.message || apiError);
      
      // Graceful fallback for demo when API key is missing
      const isMissingKey = apiError?.message?.includes('not configured');
      const fallbackReplyAr = `
مرحباً بك في منصة برمجني (Barmegny)! 
نظام المساعد الذكي يعمل حالياً في وضع العرض التجريبي والمحاكاة لعدم ضبط مفتاح الـ API Key في الإعدادات.

بصفتي مساعد م. يوسف بلح، يسرني إخبارك أننا متخصصون في:
- أنظمة ERP والمحاسبة المتكاملة بقوة ASP.NET Core 9 و SQL Server.
- أنظمة الكاشير وPOS السريعة للشركات والمطاعم والصيدليات.
- المواقع والحلول السحابية فائقة السرعة.

يمكنك تجربة جميع الميزات الرائعة مثل:
1. حاسبة "اطلب مشروع" الذكية لتلقي عرض سعر فوري.
2. لوحة تحكم العملاء لمتابعة مشروع تجريبي.
3. لوحة تحكم المدير الإداري (CMS) الكاملة لتعديل المشاريع والمقالات والتحكم ببيانات الموقع.

يسعدنا تواصلك المباشر مع م. يوسف بلح على الواتساب لمناقشة فكرة مشروعك وتلقي استشارة تقنية مجانية!
      `.trim();

      const fallbackReplyEn = `
Welcome to Barmegny! 
Our AI Assistant is currently running in simulated demo mode as the Gemini API Key is not configured in settings.

As Eng. Youssef Balah's technical assistant, I can assure you that we deliver exceptional software products:
- ERP & Accounting systems built with ASP.NET Core 9 and SQL Server.
- Lightning-fast POS systems for restaurants, retail, and pharmacies.
- Tailored web and mobile cloud services.

We invite you to explore:
1. The "Order a Project" wizard to get custom estimates.
2. The Client Portal to track active developments.
3. The Admin CMS Dashboard to manage blog posts and portfolio items.

For queries or immediate consultations, feel free to contact Eng. Youssef Balah directly on WhatsApp!
      `.trim();

      return res.json({
        reply: language === 'en' ? fallbackReplyEn : fallbackReplyAr,
        simulated: true
      });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
});

// Start server and handle Vite mounting
async function bootstrap() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Barmegny Server running on http://localhost:${PORT}`);
  });
}

bootstrap();

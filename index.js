import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// ✅ OpenAI client setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testOpenAI() {
  try {
    console.log('🔧 Testing OpenAI connection...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Say hello!" }],
      max_tokens: 50
    });

    const reply = completion.choices[0].message.content;
    console.log('✅ OpenAI is working! Response:', reply);
    
    return true;
  } catch (error) {
    console.error('❌ OpenAI test failed:', error.message);
    return false;
  }
}

async function startBot() {
  console.log('🚀 WhatsApp AI Bot - Setup Information');
  console.log('=======================================');
  
  // Test OpenAI connection
  const openaiWorking = await testOpenAI();
  
  if (!openaiWorking) {
    console.error('❌ Cannot proceed without OpenAI connection');
    return;
  }

  console.log('');
  console.log('📋 IMPORTANT: WhatsApp Web API Limitation');
  console.log('==========================================');
  console.log('❌ WhatsApp Web automation (whatsapp-web.js) cannot run in this');
  console.log('   Replit environment due to missing Chrome browser dependencies.');
  console.log('');
  console.log('💡 SOLUTION OPTIONS:');
  console.log('1. 📱 Use WhatsApp Business API (Official)');
  console.log('   - Requires Meta approval and business verification');
  console.log('   - Costs money but more reliable for production');
  console.log('   - Visit: https://business.whatsapp.com/');
  console.log('');
  console.log('2. 🖥️  Run this bot on your local computer');
  console.log('   - Download this project');
  console.log('   - Install Node.js and dependencies');
  console.log('   - Run: npm install && npm start');
  console.log('');
  console.log('3. ☁️  Use a VPS/Cloud server');
  console.log('   - Deploy to DigitalOcean, AWS, or Google Cloud');
  console.log('   - Ensure Chrome dependencies are installed');
  console.log('');
  console.log('✅ Your OpenAI integration is ready and working!');
  console.log('✅ Just need to run the bot in a compatible environment.');
  console.log('');
  console.log('🔄 This message will repeat every 30 seconds...');
  
  // Keep the process running and repeat the message
  setInterval(() => {
    console.log('⏰ Bot is ready but waiting for compatible environment...');
  }, 30000);
}

startBot();

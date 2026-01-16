import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

const openai = new OpenAI(
    {
        apiKey: process.env.DASHSCOPE_API_KEY,
        // 以下是北京地域base_url，如果使用新加坡地域的模型，需要将base_url替换为：https://dashscope-intl.aliyuncs.com/compatible-mode/v1
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    }
);

// 创建 readline 接口
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 存储对话历史
const messages = [];

// 添加系统提示（可选）
function addSystemMessage(content) {
    messages.push({ role: "system", content });
}

// 添加用户消息
function addUserMessage(content) {
    messages.push({ role: "user", content });
}

// 添加助手回复
function addAssistantMessage(content) {
    messages.push({ role: "assistant", content });
}

// 发送消息到 AI
async function sendMessage(userInput) {
    try {
        addUserMessage(userInput);
        
        const completion = await openai.chat.completions.create({
            model: "qwen-plus",
            messages: messages,
        });
        
        const assistantReply = completion.choices[0].message.content;
        addAssistantMessage(assistantReply);
        
        return assistantReply;
    } catch (error) {
        console.error("错误:", error.message);
        return `抱歉，发生了错误: ${error.message}`;
    }
}

// 主函数：启动交互式对话
async function main() {
    console.log("🤖 AI 助手已启动！输入 'exit' 或 'quit' 退出对话\n");
    
    // 可选：添加系统提示
    // addSystemMessage("你是一个有用的AI助手。");
    
    const askQuestion = () => {
        rl.question("你: ", async (userInput) => {
            const trimmedInput = userInput.trim();
            
            // 检查退出命令
            if (trimmedInput.toLowerCase() === "exit" || trimmedInput.toLowerCase() === "quit") {
                console.log("\n👋 再见！");
                rl.close();
                process.exit(0);
            }
            
            // 检查空输入
            if (!trimmedInput) {
                console.log("请输入有效的问题。\n");
                askQuestion();
                return;
            }
            
            // 显示加载提示
            process.stdout.write("AI: ");
            
            // 发送消息并获取回复
            const reply = await sendMessage(trimmedInput);
            console.log(reply + "\n");
            
            // 继续下一轮对话
            askQuestion();
        });
    };
    
    // 开始第一轮对话
    askQuestion();
}

main();
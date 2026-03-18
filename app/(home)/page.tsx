import Image from 'next/image';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import {
  BatteryChargingIcon,
  FileIcon,
  FileTextIcon,
  Heart,
  SearchIcon,
  SparklesIcon,
  TimerIcon,
} from 'lucide-react';import { Marquee } from '@/app/(home)/marquee';
import { ServerCodeBlock } from 'fumadocs-ui/components/codeblock.rsc';
import {
  Hero,
  AgnosticBackground,
  AIChatAnimation,
  ApiPlayground,
  PreviewImages,
  Writing,
} from '@/app/(home)/page.client';
import ContributorCounter from '@/components/contributor-count';
import { owner, repo } from '@/lib/github';
import StoryImage from './story.png';
import CLIImage from './cli.png';
import Bg2Image from './bg-2.png';

const headingVariants = cva('font-medium tracking-tight', {
  variants: {
    variant: {
      h2: 'text-3xl lg:text-4xl',
      h3: 'text-xl lg:text-2xl',
    },
  },
});

const buttonVariants = cva(
  'inline-flex justify-center px-5 py-3 rounded-full font-medium tracking-tight transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand text-brand-foreground hover:bg-brand-200',
        secondary: 'border bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-accent',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

const cardVariants = cva('rounded-2xl text-sm p-6 bg-origin-border shadow-lg', {
  variants: {
    variant: {
      secondary: 'bg-brand-secondary text-brand-secondary-foreground',
      default: 'border bg-fd-card',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export default function Page() {
  return (
    <main className="text-landing-foreground pt-4 pb-6 dark:text-landing-foreground-dark md:pb-12">
      <div className="relative flex min-h-[600px] h-[70vh] max-h-[900px] border rounded-2xl overflow-hidden mx-auto w-full max-w-[1400px] bg-origin-border">
        <Hero />
        <div className="flex flex-col z-2 px-4 size-full md:p-12 max-md:items-center max-md:text-center">
          <p className="mt-12 text-xs text-brand font-medium rounded-full p-2 border border-brand/50 w-fit">
            Build The Future
          </p>
          <h1 className="text-4xl my-8 leading-tighter font-medium xl:text-5xl xl:mb-12">
            Accelerating the implementation of
            <br />
            <span className="text-brand">Artificial Intelligence.</span>
          </h1>
          <div className="flex flex-row items-center justify-center gap-4 flex-wrap w-fit">
            <Link href="/docs" className={cn(buttonVariants(), 'max-sm:text-sm')}>
              Getting Started
            </Link>
            <a
              href="https://api.amethyst.ltd"
              target="_blank"
              rel="noreferrer noopener"
              className={cn(buttonVariants({ variant: 'secondary' }), 'max-sm:text-sm')}
            >
              API Platform
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 mt-12 px-6 mx-auto w-full max-w-[1400px] md:px-12 lg:grid-cols-2 lg:mt-20">
        <p className="text-2xl tracking-tight leading-snug font-light col-span-full md:text-3xl xl:text-4xl">
          <span className="text-brand font-medium">Experimentation</span>,{' '}
          <span className="text-brand font-medium">Reverse Engineering</span>,{' '}
          <span className="text-brand font-medium">Development</span>. Dedicated to{' '}
          <span className="text-brand font-medium">AI Agent</span> implementation and{' '}
          <span className="text-brand font-medium">risk insight</span>.
        </p>
        <div className="relative p-4 rounded-2xl col-span-full z-2 overflow-hidden md:p-8">
          <Image
            src={CLIImage}
            alt=""
            className="absolute inset-0 size-full object-top object-cover -z-1"
          />
          <div className="mx-auto w-full max-w-[800px] p-2 bg-fd-card text-fd-card-foreground border rounded-2xl shadow-lg">
            <div className="relative bg-fd-secondary rounded-xl border shadow-md">
              <div className="flex flex-row items-center gap-2 border-b p-2 text-fd-muted-foreground">
                <SparklesIcon className="size-4" />
                <span className="text-xs font-medium">AI Assistant</span>
                <div className="ms-auto me-2 size-2 rounded-full bg-green-400" />
              </div>

              <AIChatAnimation className="p-4 text-fd-secondary-foreground/80" />
            </div>
          </div>
        </div>
        <Feedback />
        <Aesthetics />

        <AnybodyCanWrite />

        <ForEngineers />
      </div>
    </main>
  );
}

function Story() {
  return (
    <div className="relative col-span-full min-h-[570px] px-2 py-6 rounded-2xl z-2 border shadow-md">
      <Image
        src={StoryImage}
        alt=""
        className="absolute inset-0 size-full -z-1 pointer-events-none object-cover object-top rounded-2xl"
      />

      <div className="w-full m-auto max-w-[500px] text-start shadow-xl p-2 bg-fd-card/80 backdrop-blur-md rounded-xl border shadow-black/50 dark:bg-fd-card/50">
        <div className="pt-3 px-3 mb-2">
          <h2
            className={cn(
              headingVariants({
                className: 'mb-4',
                variant: 'h3',
              }),
            )}
          >
            Choose and use
          </h2>
          <p className="text-sm mb-4">
            Enter your API key and experience the model instantly — no setup required.
          </p>
        </div>
        <ApiPlayground />
      </div>
    </div>
  );
}

function Aesthetics() {
  return (
    <>
      <div
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'flex items-center justify-center p-0',
          }),
        )}
      >
        <PreviewImages />
      </div>
      <div className={cn(cardVariants(), 'flex flex-col')}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Minimal Interface. Maximum Clarity.
        </h3>
        <p className="mb-4">
          AmethystLabs surfaces complex AI signals in a clean, developer-first interface — no noise,
          just the data and outputs you need.
        </p>
        <p className="mb-4">Integrate any model via a single unified API. Swap providers without rewriting your stack.</p>
        <ServerCodeBlock
          code={`const res = await fetch("https://api.amethyst.ltd/v1/chat", {\n  method: "POST",\n  body: JSON.stringify({ model: "claude", prompt: "..." }),\n});`}
          lang="ts"
        />
      </div>
    </>
  );
}

function AnybodyCanWrite() {
  return (
    <Writing
      tabs={{
        writer: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ServerCodeBlock
              code={`// Pick your model — one field change
const config = {
  model: "claude-3-5-sonnet",
  // or: "gpt-4o" | "gemini-2.0-flash"
  //     "gpt-4o-mini" | "gemini-2.5-pro"
  temperature: 0.7,
  max_tokens: 1024,
  stream: false,
};`}
              lang="ts"
            />
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                Pick your model.
              </h3>
              <p>
                Switch between Claude, GPT-4o, and Gemini with a single parameter. All models share
                the same request format — no SDK changes needed.
              </p>
              <ul className="text-xs list-disc list-inside mt-8">
                <li>Claude 3.5 Sonnet / Claude 3 Opus</li>
                <li>GPT-4o / GPT-4o Mini</li>
                <li>Gemini 2.0 Flash / Gemini 2.5 Pro</li>
                <li>Unified model ID format</li>
                <li>Hot-swap without code changes</li>
              </ul>
            </div>
          </div>
        ),
        developer: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ServerCodeBlock
              code={`const response = await fetch(
  "https://api.amethyst.ltd/v1/chat",
  {
    method: "POST",
    headers: {
      "Authorization": \`Bearer \${AME_API_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-5-sonnet",
      messages: [
        { role: "user", content: "Explain transformers." }
      ],
    }),
  }
);`}
              lang="ts"
            />
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                One endpoint, any model.
              </h3>
              <p>
                A single HTTP endpoint handles all providers. Compatible with the OpenAI SDK — no
                new library needed.
              </p>
              <ul className="text-xs list-disc list-inside mt-8">
                <li>REST API / OpenAI SDK compatible</li>
                <li>Anthropic & Gemini format support</li>
                <li>API key authentication</li>
                <li>Low-latency global routing</li>
                <li>CORS enabled for browser clients</li>
              </ul>
            </div>
          </div>
        ),
        automation: (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ServerCodeBlock
              code={`const data = await response.json();
// {
//   id: "msg_01XFDUDYJgAACzvnptvVoYEL",
//   model: "claude-3-5-sonnet",
//   choices: [{
//     message: {
//       role: "assistant",
//       content: "Transformers use self-attention..."
//     },
//     finish_reason: "stop"
//   }],
//   usage: {
//     prompt_tokens: 14,
//     completion_tokens: 256,
//     total_tokens: 270
//   }
// }
console.log(data.choices[0].message.content);`}
              lang="ts"
            />
            <div className="max-lg:row-start-1">
              <h3 className={cn(headingVariants({ variant: 'h3', className: 'my-4' }))}>
                Standardized response.
              </h3>
              <p>
                Every model returns the same shape — no per-provider parsing logic. Usage stats,
                finish reason, and content all in one consistent object.
              </p>
              <ul className="text-xs list-disc list-inside mt-8">
                <li>Unified choices[] format</li>
                <li>Token usage per request</li>
                <li>Finish reason tracking</li>
                <li>Model ID in every response</li>
                <li>JSON always, no surprises</li>
              </ul>
            </div>
          </div>
        ),
      }}
    />
  );
}

const feedback = [
  {
    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3303289608&spec=640&img_type=jpg',
    user: '阳毅',
    role: 'AmethystAPI Users',
    message: '紫水晶牛逼',
  },
  {
    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3303289608&spec=640&img_type=jpg',
    user: '阳毅',
    role: 'AmethystAPI Users',
    message: '紫水晶牛逼',
  },
  {
    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3303289608&spec=640&img_type=jpg',
    user: '阳毅',
    role: 'AmethystAPI Users',
    message: '紫水晶牛逼',
  },
  {
    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3303289608&spec=640&img_type=jpg',
    user: '阳毅',
    role: 'AmethystAPI Users',
    message: '紫水晶牛逼',
  },
  {
    avatar: 'http://q.qlogo.cn/headimg_dl?dst_uin=3303289608&spec=640&img_type=jpg',
    user: '阳毅',
    role: 'AmethystAPI Users',
    message: '紫水晶牛逼',
  },
];

function Feedback() {
  return (
    <>
      <div className={cn(cardVariants())}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Trusted by AI builders.
        </h3>
        <p className="mb-6">
          Powering experimentation and production AI workflows — from solo researchers to engineering
          teams pushing the frontier.
        </p>
        <a
          href="https://api.amethyst.ltd"
          target="_blank"
          rel="noreferrer noopener"
          className={cn(buttonVariants())}
        >
          API Platform
        </a>
      </div>
      <div
        className={cn(
          cardVariants({
            variant: 'secondary',
            className: 'relative p-0',
          }),
        )}
      >
        <div className="absolute inset-0 z-2 inset-shadow-[0_10px_60px] inset-shadow-brand-secondary rounded-2xl" />
        <Marquee className="p-8">
          {feedback.map((item, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl border bg-fd-card text-landing-foreground p-4 shadow-lg w-[320px]"
            >
              <p className="text-sm whitespace-pre-wrap">{item.message}</p>

              <div className="mt-auto flex flex-row items-center gap-2 pt-4">
                <Image
                  src={item.avatar}
                  alt="avatar"
                  width="32"
                  height="32"
                  unoptimized
                  className="size-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{item.user}</p>
                  <p className="text-xs text-fd-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}

function ForEngineers() {
  return (
    <>
      <h2
        className={cn(
          headingVariants({
            variant: 'h2',
            className: 'text-brand text-center mb-4 col-span-full',
          }),
        )}
      >
        Docs For Engineers.
      </h2>
      <Story />

      <div className={cn(cardVariants(), 'relative flex flex-col overflow-hidden z-2')}>
        <h3
          className={cn(
            headingVariants({
              variant: 'h3',
              className: 'mb-6',
            }),
          )}
        >
          API Compatible by Design
        </h3>
        <p className="mb-20">
          AmethystAPI speaks <span className="text-brand font-medium">OpenAI</span>,{' '}
          <span className="text-brand font-medium">Anthropic</span>, and{' '}
          <span className="text-brand font-medium">Gemini</span> API formats natively — swap
          providers without changing your integration.
        </p>
        

        <AgnosticBackground />
      </div>
      <div
        className={cn(
          cardVariants({
            className: 'flex flex-col',
          }),
        )}
      >
        <h3
          className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}
          style={{ background: 'unset', backgroundColor: 'unset' }}
        >
          We're committed to building a thriving community ecosystem.
        </h3>
        <p className="mb-8">
          Join a growing network of{' '}
          <span className="text-brand">AI builders</span>,{' '}
          <span className="text-brand">researchers</span>, and{' '}
          <span className="text-brand">engineers</span>. We share{' '}
          <span className="text-brand">open-source tools</span>, real-world integrations, and{' '}
          <span className="text-brand">community-driven insights</span> — because the best AI
          infrastructure is built together.
        </p>
        <div className="mt-auto flex flex-col gap-2 @container mask-[linear-gradient(to_bottom,white,transparent)]">
          {[
            {
              name: 'Argus',
              description: 'A CAPTCHA solver system powered by Computer Use models.',
            },
            {
              name: 'Amepx',
              description: 'A login system built on top of the QQ Bot protocol.',
            },
            {
              name: 'TenVision',
              description: "An OpenCV-based library for solving Tencent's Ten-Sec CAPTCHA.",
            },
            {
              name: 'A2Bot-Next',
              description: 'An open-source QQ Bot framework.',
            },
            {
              name: 'Hermes',
              description:
                'Automates the full lifecycle of Google Flow credentials, from first login to periodic token refresh, with automatic session reporting to Flow2API.',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex flex-col text-sm gap-2 p-2 border border-dashed border-brand-secondary @lg:flex-row @lg:items-center last:@max-lg:hidden"
            >
              <p className="font-medium text-nowrap">{item.name}</p>
              <p className="text-xs flex-1 @lg:text-end">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={cn(cardVariants())}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Built in the open.
        </h3>
        <p className="mb-4">
          Every tool we ship lives on{' '}
          <span className="text-brand">GitHub</span> — from{' '}
          <span className="text-brand">AI-driven CAPTCHA solvers</span> to{' '}
          <span className="text-brand">bot infrastructure</span>. Explore, fork, and contribute.
        </p>
        <div className="flex flex-row flex-wrap gap-4 mb-6">
          {[
            {
              href: 'https://github.com/AmethystDev-Labs/Argus',
              text: 'Argus',
            },
            {
              href: 'https://github.com/AmethystDev-Labs/Hermes',
              text: 'Hermes',
            },
            {
              href: 'https://github.com/AmethystDev-Labs/A2Bot-next',
              text: 'A2Bot-Next',
            },
            {
              href: 'https://github.com/AmethystDev-Labs/TenVision',
              text: 'TenVision',
            },
            {
              href: 'https://github.com/AmethystDev-Labs/amepx',
              text: 'Amepx',
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              rel="noreferrer noopener"
              target="_blank"
              className="text-sm text-brand hover:underline"
            >
              {item.text}
            </a>
          ))}
        </div>
        <ServerCodeBlock
          codeblock={{
            title: 'Hermes',
          }}
          code={`from hermes import Hermes

client = Hermes(
    endpoint="https://your-flow2api.app/api",
    refresh_interval=3600,
)

await client.start()
# login → token refresh → session reporting, fully automated`.trim()}
          lang="python"
        />
      </div>
      <div
        className={cn(cardVariants({ className: 'relative overflow-hidden min-h-[400px] z-2' }))}
      >
        <Image
          src={Bg2Image}
          alt=""
          className="absolute inset-0 size-full object-cover object-top -z-1"
        />
        <div className="absolute top-8 left-4 w-[70%] flex flex-col bg-neutral-50/80 backdrop-blur-lg border text-neutral-800 p-2 rounded-xl shadow-lg shadow-black dark:bg-neutral-900/80 dark:text-neutral-200">
          <p className="px-2 pb-2 font-medium border-b mb-2 text-neutral-500 dark:text-neutral-400">
            Chat History
          </p>
          {[
            { prompt: 'Generate an HTML grid background', badge: 'Code', color: 'bg-brand text-brand-foreground' },
            { prompt: 'Generate an image of a sunset', badge: 'Art', color: 'bg-pink-500 text-white' },
            { prompt: 'Explain how transformers work', badge: 'Text', color: 'bg-blue-500 text-white' },
            { prompt: 'Write a Python web scraper', badge: 'Code', color: 'bg-brand text-brand-foreground' },
          ].map((item) => (
            <div
              key={item.prompt}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-400/20"
            >
              <SparklesIcon className="stroke-neutral-500 size-4 shrink-0 dark:stroke-neutral-400" />
              <span className="text-sm truncate">{item.prompt}</span>
              <div className={`px-3 py-1 font-mono rounded-full text-xs ms-auto shrink-0 ${item.color}`}>
                {item.badge}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 right-4 w-[70%] flex flex-col bg-neutral-100 text-neutral-800 rounded-xl border shadow-lg shadow-black dark:bg-neutral-900 dark:text-neutral-200">
          <div className="px-4 py-2 text-neutral-500 border-b font-medium dark:text-neutral-400">
            Generate an HTML grid background
          </div>
          <div className="flex flex-col gap-3 p-3 text-sm">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium text-neutral-400">User</span>
              <p className="bg-brand/10 text-neutral-700 dark:text-neutral-300 rounded-lg px-3 py-2 w-fit max-w-[85%]">
                Generate an HTML grid background with subtle lines.
              </p>
            </div>
            <div className="flex flex-col gap-1 items-end">
              <span className="text-xs font-medium text-neutral-400">Assistant</span>
              <p className="bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg px-3 py-2 w-fit max-w-[85%] text-right">
                Sure! Here&apos;s a CSS grid background using <code className="text-brand">background-image</code> with linear gradients…
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={cn(cardVariants(), 'flex flex-col max-md:pb-0')}>
        <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
          Find the right model.
        </h3>
        <p className="mb-6">
          Browse and compare{' '}
          <span className="text-brand">300+ supported models</span> — from frontier reasoning
          engines to fast, cost-efficient options.
        </p>
        <Link
          href="/docs"
          className={cn(buttonVariants({ className: 'w-fit mb-8' }))}
        >
          View All Models
        </Link>
        <Search />
      </div>
      <div className={cn(cardVariants(), 'flex flex-col p-0 overflow-hidden')}>
        <div className="p-6">
          <h3 className={cn(headingVariants({ variant: 'h3', className: 'mb-6' }))}>
            Speaks every language.
          </h3>
          <p className="mb-6">
            Our models understand and respond in{' '}
            <span className="text-brand">100+ languages</span> — from English to Arabic, Japanese
            to Hindi, fluently and naturally.
          </p>
          <a
            href="https://api.amethyst.ltd"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(buttonVariants({ className: 'w-fit' }))}
          >
            Try It
          </a>
        </div>
        <div className="mt-6 flex flex-col border-t overflow-hidden mask-[linear-gradient(to_bottom,white_50%,transparent_100%)]">
          {[
            { lang: 'EN', text: 'How can I help you today?' },
            { lang: 'ZH', text: '今天我能帮您做什么？' },
            { lang: 'JA', text: '今日はどのようにお手伝いできますか？' },
            { lang: 'AR', text: 'كيف يمكنني مساعدتك اليوم؟' },
            { lang: 'ES', text: '¿En qué puedo ayudarte hoy?' },
            { lang: 'FR', text: "Comment puis-je vous aider aujourd'hui ?" },
            { lang: 'KO', text: '오늘 무엇을 도와드릴까요?' },
            { lang: 'DE', text: 'Wie kann ich Ihnen heute helfen?' },
            { lang: 'RU', text: 'Чем я могу вам помочь сегодня?' },
            { lang: 'HI', text: 'आज मैं आपकी कैसे मदद कर सकता हूँ?' },
          ].map((item) => (
            <div
              key={item.lang}
              className="flex items-center gap-4 px-6 py-3 border-b last:border-0"
            >
              <span className="text-xs font-mono font-semibold text-brand w-6 shrink-0">
                {item.lang}
              </span>
              <span className="text-sm text-fd-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const searchItemVariants = cva('rounded-md p-2 text-sm text-fd-popover-foreground');

function Search() {
  return (
    <div className="flex select-none flex-col mt-auto bg-fd-popover rounded-xl border mask-[linear-gradient(to_bottom,white_40%,transparent_90%)] max-md:-mx-4">
      <div className="inline-flex items-center gap-2 px-4 py-3 text-sm text-fd-muted-foreground">
        <SearchIcon className="size-4" />
        Search models...
      </div>
      <div className="border-t p-2">
        {[
          { name: 'gpt-5', desc: 'OpenAI · Frontier reasoning & instruction following' },
          { name: 'deepseek-r1-0528', desc: 'DeepSeek · Advanced chain-of-thought reasoning' },
          { name: 'gemini-2.5-flash', desc: 'Google · Fast, multimodal, cost-efficient' },
          { name: 'grok-4', desc: 'xAI · Frontier model with real-time knowledge' },
          { name: 'qwen3-235b', desc: 'Alibaba · Large-scale MoE, multilingual' },
        ].map((model, i) => (
          <div key={model.name} className={cn(searchItemVariants(), i === 0 && 'bg-fd-accent')}>
            <div className="flex flex-row items-center gap-2">
              <SparklesIcon className="size-4 text-fd-muted-foreground shrink-0" />
              <p className="font-mono text-xs">{model.name}</p>
            </div>
            <p className="text-xs mt-2 text-fd-muted-foreground ps-6">{model.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}




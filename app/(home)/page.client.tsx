'use client';

import {
  type ComponentProps,
  Fragment,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import { cva } from 'class-variance-authority';
import HeroImage from './hero-preview.jpeg';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const GrainGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.GrainGradient),
  {
    ssr: false,
  },
);

const Dithering = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.Dithering),
  {
    ssr: false,
  },
);

export function Hero() {
  const { resolvedTheme } = useTheme();
  const ref = useRef<HTMLImageElement | null>(null);
  const visible = useIsVisible(ref);
  const [showShaders, setShowShaders] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  useEffect(() => {
    // apply some delay, otherwise on slower devices, it errors with uniform images not being fully loaded.
    setTimeout(() => {
      setShowShaders(true);
    }, 400);
  }, []);

  return (
    <>
      {showShaders && (
        <GrainGradient
          className="absolute inset-0 animate-fd-fade-in duration-800"
          colors={
            resolvedTheme === 'dark'
              ? ['#39BE1C', '#9c2f05', '#7A2A0000']
              : ['#fcfc51', '#ffa057', '#7A2A0020']
          }
          colorBack="#00000000"
          softness={1}
          intensity={0.9}
          noise={0.5}
          speed={visible ? 1 : 0}
          shape="corners"
          minPixelRatio={1}
          maxPixelCount={1920 * 1080}
        />
      )}
      {showShaders && (
        <Dithering
          width={720}
          height={720}
          colorBack="#00000000"
          colorFront={resolvedTheme === 'dark' ? '#DF3F00' : '#fa8023'}
          shape="sphere"
          type="4x4"
          scale={0.5}
          size={3}
          speed={0}
          frame={5000 * 120}
          className="absolute animate-fd-fade-in duration-400 max-lg:bottom-[-50%] max-lg:left-[-200px] lg:top-[-5%] lg:right-0"
          minPixelRatio={1}
        />
      )}
      <Image
        ref={ref}
        src={HeroImage}
        alt="hero-image"
        className={cn(
          'absolute top-[460px] left-[20%] max-w-[1200px] rounded-xl border-2 lg:top-[400px]',
          imageReady ? 'animate-in fade-in duration-400' : 'invisible',
        )}
        onLoad={() => setImageReady(true)}
        priority
      />
    </>
  );
}

export function CreateAppAnimation(props: ComponentProps<'div'>) {
  const installCmd = 'pnpm create fumadocs-app';
  const tickTime = 100;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 3;
  const timeCommandEnd = timeCommandRun + 3;
  const timeWindowOpen = timeCommandEnd + 1;
  const timeEnd = timeWindowOpen + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);

    return () => {
      clearInterval(timer);
    };
  }, [timeEnd]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="command_type">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <div className="inline-block h-3 w-1 animate-pulse bg-fd-foreground" />
      )}
    </span>,
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space"> </span>);
  }

  if (tick > timeCommandRun)
    lines.push(
      <Fragment key="command_response">
        {tick > timeCommandRun + 1 && (
          <>
            <span className="font-medium">◇ Project name</span>
            <span>│ my-app</span>
          </>
        )}
        {tick > timeCommandRun + 2 && (
          <>
            <span>│</span>
            <span className="font-medium">◆ Choose a framework</span>
          </>
        )}
        {tick > timeCommandRun + 3 && (
          <>
            <span>│ ● Next.js</span>
            <span>│ ○ Waku</span>
            <span>│ ○ Tanstack Start</span>
            <span>│ ○ React Router</span>
          </>
        )}
      </Fragment>,
    );

  return (
    <div
      {...props}
      onMouseEnter={() => {
        if (tick >= timeEnd) {
          setTick(0);
        }
      }}
    >
      {tick > timeWindowOpen && (
        <LaunchAppWindow className="absolute bottom-5 right-4 z-10 animate-in fade-in slide-in-from-top-10" />
      )}
      <pre className="font-mono text-sm min-h-[240px]">
        <code className="grid">{lines}</code>
      </pre>
    </div>
  );
}

function LaunchAppWindow(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('overflow-hidden rounded-md border bg-fd-popover shadow-lg', props.className)}
    >
      <p className="text-xs text-fd-muted-foreground text-center px-4 py-2 border-b">
        localhost:3000
      </p>
      <p className="text-sm px-4 py-2">New App launched!</p>
    </div>
  );
}

const previewButtonVariants = cva('w-20 h-8 text-sm font-medium transition-colors rounded-full', {
  variants: {
    active: {
      true: 'text-fd-primary-foreground',
      false: 'text-fd-muted-foreground',
    },
  },
});
const AI_MODELS = [
  {
    id: 'codex',
    name: 'Codex',
    vendor: 'OpenAI',
    tagline: 'Autonomous software engineering agent',
    description:
      "Codex is OpenAI's dedicated coding model capable of reading entire codebases, writing and executing code autonomously, and resolving multi-step engineering tasks — from targeted bug fixes to full feature implementations — with minimal human intervention.",
    specs: [
      { label: 'Context Window', value: '200K tokens' },
      { label: 'Specialization', value: 'Agentic coding' },
      { label: 'Output', value: 'Code · Tests · PRs' },
    ],
  },
  {
    id: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    tagline: 'Highest coding intelligence & contextual EQ',
    description:
      "Claude leads on nuanced reasoning, complex code generation, and deep instruction-following. Anthropic's Constitutional AI training delivers exceptional safety alignment and contextual depth — the preferred choice for production-grade, high-stakes engineering challenges.",
    specs: [
      { label: 'Context Window', value: '200K tokens' },
      { label: 'Specialization', value: 'Code · Analysis · Writing' },
      { label: 'Output', value: 'Text · Code · Artifacts' },
    ],
  },
  {
    id: 'gemini',
    name: 'Gemini',
    vendor: 'Google DeepMind',
    tagline: 'Native multimodal reasoning at 1M context',
    description:
      'Gemini 2.5 Pro natively processes text, images, audio, video, and code within a 1-million-token context window. Its chain-of-thought architecture achieves state-of-the-art benchmarks on mathematics, science, and long-horizon analytical reasoning tasks.',
    specs: [
      { label: 'Context Window', value: '1M tokens' },
      { label: 'Specialization', value: 'Multimodal · Reasoning' },
      { label: 'Output', value: 'Text · Code · Analysis' },
    ],
  },
] as const;

type AIModel = (typeof AI_MODELS)[number];

function ModelInfoCard({ model }: { model: AIModel }) {
  return (
    <div className="size-full flex flex-col sm:flex-row rounded-xl bg-fd-card border border-fd-border overflow-hidden shadow-lg @container">
      {/* Left panel */}
      <div className="flex flex-col gap-3 @md:gap-4 p-4 @md:p-6 @lg:p-8 sm:w-[42%] shrink-0 border-b sm:border-b-0 sm:border-r border-fd-border">
        <div>
          <p className="text-base @md:text-xl @lg:text-2xl font-bold tracking-tight text-fd-foreground">{model.name}</p>
          <p className="text-[10px] @md:text-xs text-fd-muted-foreground mt-1">{model.vendor}</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] @md:text-xs text-green-400 font-medium">
          <span className="size-1.5 rounded-full bg-green-400 shrink-0" />
          Available on AmethystAPI
        </div>
        <p className="text-xs @md:text-sm font-semibold text-brand leading-snug">{model.tagline}</p>
        <div className="mt-auto flex flex-col gap-2 @md:gap-2.5 pt-3 @md:pt-4">
          {model.specs.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-0.5 border-b border-dashed border-fd-border pb-2 last:border-0"
            >
              <span className="text-[10px] @md:text-xs text-fd-muted-foreground">{s.label}</span>
              <span className="text-[10px] @md:text-xs font-mono font-semibold text-fd-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Right panel */}
      <div className="flex items-center p-4 @md:p-6 @lg:p-8 sm:w-[58%]">
        <p className="text-xs @md:text-sm leading-relaxed text-fd-foreground/80">{model.description}</p>
      </div>
    </div>
  );
}

export function PreviewImages(props: ComponentProps<'div'>) {
  const [active, setActive] = useState(1); // default: Claude

  return (
    <div {...props} className={cn('relative w-full min-h-[400px]', props.className)}>
      {/* Tab bar — lifted 4 from bottom */}
      <div className="absolute flex flex-row left-1/2 -translate-x-1/2 bottom-4 z-10 p-0.5 rounded-full bg-fd-card border shadow-xl">
        <div
          role="none"
          className="absolute bg-fd-primary rounded-full w-20 h-8 transition-transform z-[-1]"
          style={{
            transform: `translateX(calc(var(--spacing) * 20 * ${active}))`,
          }}
        />
        {AI_MODELS.map((model, i) => (
          <button
            key={model.id}
            className={cn(previewButtonVariants({ active: active === i }))}
            onClick={() => setActive(i)}
          >
            {model.name}
          </button>
        ))}
      </div>
      {/* Cards */}
      {AI_MODELS.map((model, i) => (
        <div
          key={model.id}
          className={cn(
            'absolute inset-0 bottom-16 p-4',
            active === i ? 'animate-in fade-in slide-in-from-bottom-4 duration-500' : 'invisible',
          )}
        >
          <ModelInfoCard model={model} />
        </div>
      ))}
    </div>
  );
}

const WritingTabs = [
  {
    name: 'Choose Models',
    value: 'writer',
  },
  {
    name: 'Fetch',
    value: 'developer',
  },
  {
    name: 'Return',
    value: 'automation',
  },
] as const;

export function Writing({
  tabs: tabContents,
}: {
  tabs: Record<(typeof WritingTabs)[number]['value'], ReactNode>;
}) {
  const [tab, setTab] = useState<(typeof WritingTabs)[number]['value']>('writer');

  return (
    <div className="col-span-full my-20">
      <h2 className="text-4xl text-brand mb-8 text-center font-medium tracking-tight">
        One API. Every Model.
      </h2>
      <p className="text-center mb-8 mx-auto w-full max-w-[800px]">
        Native support for OpenAI, Anthropic, and Gemini API formats — simple to start, powerful at
        scale.
      </p>
      <div className="flex justify-center items-center gap-4 text-fd-muted-foreground mb-6">
        {WritingTabs.map((item) => (
          <Fragment key={item.value}>
            <ArrowRight className="size-4 first:hidden" />
            <button
              className={cn(
                'text-lg font-medium transition-colors',
                item.value === tab && 'text-brand',
              )}
              onClick={() => setTab(item.value)}
            >
              {item.name}
            </button>
          </Fragment>
        ))}
      </div>
      {Object.entries(tabContents).map(([key, value]) => (
        <div
          key={key}
          aria-hidden={key !== tab}
          className={cn('animate-fd-fade-in', key !== tab && 'hidden')}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export function AgnosticBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useIsVisible(ref);

  return (
    <div
      ref={ref}
      className="absolute inset-0 -z-1 mask-[linear-gradient(to_top,white_30%,transparent_calc(100%-120px))]"
    >
      <Dithering
        colorBack="#00000000"
        colorFront="#c6bb58"
        shape="warp"
        type="4x4"
        speed={visible ? 0.4 : 0}
        className="size-full"
        minPixelRatio={1}
      />
    </div>
  );
}

let observer: IntersectionObserver;
const observerTargets = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

function useIsVisible(ref: RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) {
        observerTargets.get(entry.target)?.(entry);
      }
    });

    const element = ref.current;
    if (!element) return;
    observerTargets.set(element, (entry) => {
      setVisible(entry.isIntersecting);
    });
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observerTargets.delete(element);
    };
  }, [ref]);

  return visible;
}

const USER_COLOR = 'text-fd-muted-foreground';
const AI_COLOR = 'text-brand';

const CHAT_MESSAGES = [
  {
    role: 'user' as const,
    text: 'How does attention mechanism enable parallelization in transformers?',
  },
  {
    role: 'assistant' as const,
    text: "Unlike RNNs, transformers compute attention scores for all token pairs simultaneously via Q·Kᵀ/√dₖ. This fully parallelizable O(n²) operation eliminates sequential dependencies—enabling massive GPU throughput during both training and inference.",
  },
  {
    role: 'user' as const,
    text: "What's the key bottleneck when scaling LLMs beyond 100B parameters?",
  },
  {
    role: 'assistant' as const,
    text: 'Memory bandwidth dominates: loading weights from HBM is 10–100× slower than compute. Tensor parallelism, pipeline parallelism, and activation checkpointing distribute this load—but inter-node communication latency then becomes the new ceiling.',
  },
] as const;

export function AIChatAnimation(props: ComponentProps<'div'>) {
  const tickTime = 18;
  const pauseTicks = 12;

  const aiMsg1 = CHAT_MESSAGES[1].text;
  const aiMsg2 = CHAT_MESSAGES[3].text;

  const tAi1Start = 1;
  const tAi1End = tAi1Start + aiMsg1.length;
  const tUser2 = tAi1End + pauseTicks;
  const tAi2Start = tUser2 + 1;
  const tAi2End = tAi2Start + aiMsg2.length;
  const timeEnd = tAi2End + pauseTicks;

  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setTick((prev) => {
        if (prev >= timeEnd) {
          setRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, tickTime);
    return () => clearInterval(timer);
  }, [running, timeEnd]);

  const ai1Chars = Math.max(0, Math.min(tick - tAi1Start + 1, aiMsg1.length));
  const showUser2 = tick >= tUser2;
  const ai2Chars = Math.max(0, Math.min(tick - tAi2Start + 1, aiMsg2.length));

  return (
    <div
      {...props}
      className={cn('flex flex-col gap-3 font-mono text-xs leading-relaxed overflow-hidden', props.className)}
      onMouseEnter={() => {
        if (!running) {
          setTick(0);
          setRunning(true);
        }
      }}
    >
      {/* User message 1 — instant */}
      <div className="flex gap-2">
        <span className={cn('shrink-0 font-semibold', USER_COLOR)}>User</span>
        <span className="opacity-80">{CHAT_MESSAGES[0].text}</span>
      </div>

      {/* AI response 1 — typewriter */}
      {ai1Chars > 0 && (
        <div className="flex gap-2">
          <span className={cn('shrink-0 font-semibold', AI_COLOR)}>AI</span>
          <span>
            {aiMsg1.substring(0, ai1Chars)}
            {ai1Chars < aiMsg1.length && (
              <span className="inline-block h-3 w-1 animate-pulse bg-fd-foreground align-middle ml-0.5" />
            )}
          </span>
        </div>
      )}

      {/* User message 2 — instant */}
      {showUser2 && (
        <div className="flex gap-2">
          <span className={cn('shrink-0 font-semibold', USER_COLOR)}>User</span>
          <span className="opacity-80">{CHAT_MESSAGES[2].text}</span>
        </div>
      )}

      {/* AI response 2 — typewriter */}
        {ai2Chars > 0 && (
        <div className="flex gap-2">
          <span className={cn('shrink-0 font-semibold', AI_COLOR)}>AI</span>
          <span>
            {aiMsg2.substring(0, ai2Chars)}
            {ai2Chars < aiMsg2.length && (
              <span className="inline-block h-3 w-1 animate-pulse bg-fd-foreground align-middle ml-0.5" />
            )}
          </span>
        </div>
      )}
    </div>
  );
}

export function ApiPlayground() {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function handleSend() {
    if (!apiKey.trim() || !prompt.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('https://api.amethyst.ltd/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gemini-3-flash-preview',
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content ?? JSON.stringify(data, null, 2));
    } catch (e) {
      setResponse('Error: ' + String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="not-prose flex flex-col gap-1 p-1 border rounded-md shadow-sm bg-fd-card text-fd-card-foreground">
      {/* Header */}
      <div className="flex flex-row items-center gap-2">
        <p className="text-sm font-medium px-1.5">Use</p>
        <div className="ms-auto pe-1">
          <button
            onClick={handleSend}
            disabled={loading || !apiKey.trim() || !prompt.trim()}
            className="inline-flex items-center justify-center text-xs font-semibold px-3 py-1 rounded-md bg-fd-primary text-fd-primary-foreground hover:opacity-90 disabled:opacity-40 transition-opacity"
          >
            {loading ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="p-3 bg-fd-background border rounded-md flex flex-col gap-3">
        {/* Key */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-fd-muted-foreground">Key</label>
          <input
            type="password"
            placeholder="sk-ame-…"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full text-sm border rounded-md px-2.5 py-1.5 bg-fd-card text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-0"
            />
          </div>

        {/* Prompt */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-fd-muted-foreground">Prompt</label>
          <textarea
            ref={textareaRef}
            placeholder="Enter your prompt…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSend();
            }}
            rows={3}
            className="w-full text-sm border rounded-md px-2.5 py-1.5 bg-fd-card text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:ring-0 resize-none"
          />
          <p className="text-xs text-fd-muted-foreground text-end">⌘ Enter to send</p>
        </div>

        {/* Response */}
        {(response || loading) && (
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-fd-muted-foreground">Response</label>
            <div className="text-sm border rounded-md px-2.5 py-2 bg-fd-card text-fd-foreground min-h-[60px] whitespace-pre-wrap leading-relaxed">
              {loading ? (
                <span className="text-fd-muted-foreground animate-pulse">Waiting for response…</span>
              ) : (
                response
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

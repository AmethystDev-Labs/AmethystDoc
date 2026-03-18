import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { ServerIcon, ShieldIcon } from 'lucide-react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      sidebar={{
        tabs: {
          transform(option, node) {
            const key = `${node.name} ${option.url} ${option.title}`.toLowerCase();
            const icon =
              key.includes('argus') ? <ShieldIcon className="size-4" /> : <ServerIcon className="size-4" />;

            return { ...option, icon };
          },
        },
      }}
      nav={{
        title: (
          <span className="font-semibold">
            AmethystLabs <span className="text-purple-400">Docs</span>
          </span>
        ),
      }}
      links={[
        {
          text: '首页',
          url: '/',
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}

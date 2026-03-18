import defaultComponents from 'fumadocs-ui/mdx';

export function getMDXComponents(components?: Record<string, unknown>) {
  return {
    ...defaultComponents,
    ...components,
  };
}

export function useMDXComponents(components: Record<string, unknown>) {
  return {
    ...defaultComponents,
    ...components,
  };
}

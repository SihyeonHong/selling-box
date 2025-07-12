export interface MyLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

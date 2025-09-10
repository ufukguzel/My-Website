import { GetMetada } from '@/lib/page-metadata';
import Image from 'next/image';

export const metadata = GetMetada('mobileApps');

export default function MobileAppsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Mobile Apps</h1>
        <p className="text-muted-foreground">
          A selection of mobile applications I have published. You can view them on the App Store.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <a
          href="https://apps.apple.com/tr/app/sleepy-fairytales/id6747094017"
          target="_blank"
          rel="noopener noreferrer"
          className="block border rounded-lg p-6 hover:bg-muted transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-16 h-16 rounded-md overflow-hidden border">
              <Image
                src="/images/sleepy-fairytales.png"
                alt="Sleepy Fairytales app icon"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Sleepy Fairytales</h3>
              <p className="text-sm text-muted-foreground mt-2">
                AI-powered bedtime fairytales for kids. Personalised stories with audio narration.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}




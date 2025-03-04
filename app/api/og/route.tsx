import { PageMetadataList } from '@/lib/page-metadata'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const colors = {
    background: '#F4F4F5', // Light neutral gray
    foreground: '#18181B', // Almost black
    muted: '#71717A', // Soft gray
    accent: '#E4E4E7', // Very light gray
}

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl
    const page = searchParams.get('page');
    const title = searchParams.get('title');
    const url = searchParams.get('url');

    const width = 1200;
    const height = 630;

    const pageTitle = title ?? page ?? '< hop />';
    const pageUrl = url ?? 'osmankoc.dev';
    const pageDesc = PageMetadataList[page ?? ''].description;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    backgroundColor: colors.background,
                    padding: '48px',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '48px',
                        left: '48px',
                        right: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.accent,
                        borderRadius: '9999px',
                        padding: '12px 24px',
                        width: '250px'
                    }}
                >
                    <div
                        style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: colors.foreground,
                        }}
                    >
                        {pageUrl}
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <h1
                        style={{
                            fontSize: '64px',
                            fontWeight: 'bold',
                            color: colors.foreground,
                            lineHeight: 1.1,
                            margin: 0,
                        }}
                    >
                        {pageTitle}
                    </h1>
                    <p
                        style={{
                            fontSize: '24px',
                            color: colors.muted,
                            margin: 0,
                            maxWidth: '80%',
                        }}
                    >
                        {pageDesc}
                    </p>
                </div>
            </div>
        ),
        { width, height }
    );
}
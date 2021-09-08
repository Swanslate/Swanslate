import Head from 'next/head';
import dynamic from 'next/dynamic';

const AblyChatComponent = dynamic(() => import('../../components/AblyChatComponent'), { ssr: false });

export default function Home() {
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <AblyChatComponent />
            </main>
        </div>
    );
}
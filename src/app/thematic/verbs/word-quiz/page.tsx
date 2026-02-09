import VerbWordQuizClient from '@/components/thematic/VerbWordQuizClient';

export default function VerbWordQuizPage() {
    return (
        <div className="max-w-full py-8 px-4 ml-0">
            <header className="mb-8 ml-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">동사 단어 퀴즈</h1>
                <p className="text-slate-500 font-medium">동사의 변화형을 보고 시제를 맞추거나, 시제에 맞게 동사를 변화시켜보세요.</p>
            </header>
            
            <VerbWordQuizClient />
        </div>
    );
}

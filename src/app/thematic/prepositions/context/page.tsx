import React, { Suspense } from 'react';
import PrepositionContextDetail from '@/components/thematic/PrepositionContextDetail';

export default function PrepositionContextPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <PrepositionContextDetail />
    </Suspense>
  );
}

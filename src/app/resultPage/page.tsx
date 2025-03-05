import { Suspense } from 'react';
import ResultComponenet from '../components/Resualt';

export default function PageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultComponenet />
        </Suspense>
    );
}

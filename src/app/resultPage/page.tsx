import { Suspense } from 'react';
import ResultComponenet from '../components/static-component/Resualt';

export default function PageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultComponenet />
        </Suspense>
    );
}

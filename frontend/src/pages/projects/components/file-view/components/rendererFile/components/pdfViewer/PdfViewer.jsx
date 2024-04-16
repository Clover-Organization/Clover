import {
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import React, { useEffect } from 'react';

const PdfViewer = () => {

    return (
        <CardContent className='grid place-items-center h-72'>
            <CardHeader className="text-center">
                <CardTitle>Unsupported file</CardTitle>
                <CardDescription>This file is not supported.</CardDescription>
            </CardHeader>
        </CardContent>
    );
};

export default PdfViewer;

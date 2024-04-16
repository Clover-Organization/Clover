import {
    CardContent,
    CardDescription,
    CardTitle
} from '@/components/ui/card';
import React, { useEffect } from 'react';

const PdfViewer = () => {

    return (
        <CardContent className='grid place-items-center'>
            <CardTitle>Unsupported file</CardTitle>
            <CardDescription>This file is not supported.</CardDescription>
        </CardContent>
    );
};

export default PdfViewer;

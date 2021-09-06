import type { NextApiRequest, NextApiResponse } from 'next';
import initialData from "./initialData.json";

interface ITasks {
    translateTasks: Array<{ sentence: string; }>;
    validationTasks: Array<{ originalText: string; translatedText: { [key: string]: string; }; }>;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ data: ITasks; }>
) {
    res.status(200).json(initialData);
}

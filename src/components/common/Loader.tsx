import { Oval } from 'react-loader-spinner';

export const Loader = () => (
    <div className="flex justify-center flex-col items-center h-64 gap-2.5">
        <span>Loading...</span>
        <Oval  height={40} width={40} color="#4fa94d" secondaryColor="#4fa94d"  strokeWidth={2} strokeWidthSecondary={2}/>
    </div>
);
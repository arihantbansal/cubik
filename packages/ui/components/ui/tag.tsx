import { FunctionComponent } from 'react';

interface Props {
    selected: boolean;
    text: string;
}


const Tag: FunctionComponent<Props> = ({selected, text}) => {
    return (
        <div className="">
            <div className="flex flex-row items-center justify-center p-1">
                <div className="relative leading-[16px] font-medium">{text}</div>
            </div>
        </div>);
};

export default Tag;

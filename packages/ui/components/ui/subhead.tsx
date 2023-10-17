import { FC } from "react";

const Subhead: FC = () => {
    return (
        <div className="w-full relative flex flex-row items-center justify-between py-3 px-4 box-border text-left text-5xl text-sub-heads-subhead-fg-primary font-display-xs-600">
            <div className="flex flex-row items-center justify-start">
                <div className="relative leading-[32px] text-3xl font-semibold">Projects</div>
            </div>
            <div className="w-[294.33px] flex flex-row items-center justify-end">
                <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="Filter/lines.svg" />
            </div>
        </div>);
};

export default Subhead;

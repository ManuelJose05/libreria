import {Card} from "primereact/card";

function CustomChipComponent(props: { title: string, value: number, iconClass: string,backgroundColor: string,iconColor: string }) {
    return (
        <Card className="flex-1">
            <div className="flex justify-content-between gap-5">
                <div className="flex flex-column gap-1">
                    <span className="text-secondary text-sm">{props.title}</span>
                    <span className="font-bold text-lg">{props.value}</span>
                </div>
                <span className="w-2rem h-2rem border-circle inline-flex justify-content-center align-items-center text-center"
                style={{backgroundColor: props.backgroundColor,color: props.iconColor}}
                >
                    <i className={props.iconClass} />
                </span>
            </div>
        </Card>
    );
}

export default CustomChipComponent;
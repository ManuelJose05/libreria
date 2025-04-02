import {Card} from "primereact/card";

function CustomChipComponent(props: { title: string, value: number, iconClass: string,backgroundColor: string,iconColor: string }) {
    return (
        <Card className="w-2">
            <div className="flex flex-row row-gap-2 justify-content-around gap-4">
                <div className="flex flex-column gap-2">
                    <span className="text-secondary text-sm">{props.title}</span>
                    <span className="font-bold text-lg">{props.value}</span>
                </div>
                <span className="w-3 h-3rem border-circle inline-flex justify-content-center align-items-center text-center"
                style={{backgroundColor: props.backgroundColor,color: props.iconColor}}
                >
                    <i className={props.iconClass} />
                </span>
            </div>
        </Card>
    );
}

export default CustomChipComponent;
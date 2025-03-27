
function CustomChipComponent(props: { title: string, value: number, iconClass: string}) {
    return (
        <div className="col-12 md:col-6 lg:col-3">
            <div className="surface-0 shadow-5 p-3">
                <div className="flex justify-content-center mb-1">
                    <div>
                        <span className="block text-500 font-medium mb-3">{props.title}</span>
                        <div className="text-900 font-medium text-xl">{props.value}</div>
                    </div>
                    <div>
                        <i className={props.iconClass}></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomChipComponent;
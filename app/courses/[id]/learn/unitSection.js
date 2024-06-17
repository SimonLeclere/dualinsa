// Section of a unit contaning a unitHeader and all the checkpoints linked to it
export default function unitSection({ children, className }) {

    return (
            <div className="flex flex-col items-center justify-center m-8" >
                {children}
            </div>
    );
}
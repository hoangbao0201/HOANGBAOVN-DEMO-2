import { IconProps } from "@/types";

const IconChevronRight: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            <svg
                width={size}
                height={size}
                {...attributes}
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
            </svg>
        </>
    );
};

export default IconChevronRight;
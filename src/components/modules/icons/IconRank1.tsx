import { IconProps } from "@/types";

const IconRank1: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="32">
                <defs>
                    <path
                        d="M23.262 11.055a1.362 1.362 0 00-.154-1.459l-.802-1.005a1.36 1.36 0 01-.296-.911l.058-1.285a1.36 1.36 0 00-.733-1.27l-1.142-.592a1.362 1.362 0 01-.641-.712l-.47-1.197a1.361 1.361 0 00-1.186-.863l-1.284-.076a1.36 1.36 0 01-.875-.39L14.82.392a1.36 1.36 0 00-1.435-.305L12.182.54c-.309.116-.65.116-.958 0L10.02.087a1.36 1.36 0 00-1.435.305l-.916.903c-.235.232-.546.37-.875.39L5.51 1.76c-.53.032-.993.368-1.187.863L3.854 3.82a1.36 1.36 0 01-.641.712l-1.142.592c-.471.244-.758.74-.734 1.27l.059 1.285c.015.33-.09.653-.296.911L.297 9.596a1.362 1.362 0 00-.153 1.46l.576 1.15c.148.294.183.633.1.952l-.324 1.245a1.362 1.362 0 00.453 1.395l.994.816c.255.21.425.505.48.83l.21 1.269c.086.524.47.95.98 1.09l1.24.342c.319.087.594.287.776.563l.708 1.074a1.36 1.36 0 001.34.596l1.272-.192c.326-.05.659.022.937.2l1.083.692c.447.286 1.02.286 1.467 0l1.084-.693c.278-.177.61-.248.937-.199l1.272.192a1.362 1.362 0 001.34-.596l.708-1.074c.181-.276.457-.476.775-.563l1.24-.342a1.36 1.36 0 00.982-1.09l.21-1.269a1.36 1.36 0 01.479-.83l.994-.816a1.36 1.36 0 00.453-1.395l-.324-1.245a1.36 1.36 0 01.1-.953l.576-1.15z"
                        id="a"
                    ></path>
                </defs>
                <g fill="none" fillRule="evenodd">
                    <path
                        d="M4.494 16.938V31.22c0 .105.146.158.232.084l6.445-5.643 6.444 5.643c.086.074.233.021.233-.084V16.938H4.494z"
                        fill="#FF2D55"
                    ></path>
                    <mask id="b" fill="#fff">
                        <use href="#a"></use>
                    </mask>
                    <use fill="#FFC400" href="#a"></use>
                    <path
                        fill="#FFF"
                        opacity=".4"
                        mask="url(#b)"
                        transform="rotate(-42 23 2.5)"
                        d="M9-11h28v27H9z"
                    ></path>
                    <text fontSize="15" fontWeight="500" fill="#333">
                        <tspan x="8" y="18">
                            1
                        </tspan>
                    </text>
                </g>
            </svg>
        </>
    );
};

export default IconRank1;
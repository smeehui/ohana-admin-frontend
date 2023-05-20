import {forwardRef} from "react";
import {useNavigate} from "react-router-dom";

const HomeIcon = forwardRef(
    ({ width = "137px", height = "40px", textColor = "#000000" }, ref) => {
        const navigate = useNavigate()
        return (
            <svg
                ref={ref}
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 137 40"
                version="1.1"
                onClick={()=>navigate("/dashboard")}
            >
                <title>0711A914-DCAC-4CEB-81DB-C279CD1DCAE0</title>
                <desc>Created with sketchtool.</desc>
                <defs>
                    <linearGradient
                        x1="70.9382469%"
                        y1="120.257063%"
                        x2="50%"
                        y2="61.5779462%"
                        id="linearGradient-1"
                    >
                        <stop stopColor="#FD9119" offset="0%" />
                        <stop stopColor="#F73486" offset="100%" />
                    </linearGradient>
                </defs>
                <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                >
                    <g
                        id="1.1---Home-floating"
                        transform="translate(-32.000000, -56.000000)"
                    >
                        <g
                            id="header"
                            transform="translate(0.000000, 40.000000)"
                        >
                            <g
                                id="ohana-logo-icon"
                                transform="translate(32.000000, 16.000000)"
                            >
                                <path
                                    d="M135.198218,10.2894771 C135.897906,11.0346012 136.333333,12.0436228 136.333333,13.1457818 L136.333333,22.4986562 C136.333333,24.7883047 134.45968,26.6666667 132.158419,26.6666667 L119.174927,26.6666667 C116.881436,26.6666667 115,24.7961116 115,22.4986562 L115,13.1457818 C115,12.0591498 115.427593,11.0578855 116.119526,10.3127615 C116.14285,10.2817198 116.166173,10.2584354 116.197271,10.2273814 C116.84256,9.5598801 118.467444,7.89888423 119.804658,6.53282761 L123.233226,3.02454246 C124.570452,1.65848585 126.762881,1.65848585 128.100058,3.02454246 L131.520918,6.5250579 C132.858107,7.89111452 134.483015,9.55212278 135.136032,10.2196241 C135.159368,10.2429084 135.182703,10.2661928 135.198218,10.2894771 Z M125.666667,21.4353085 C127.866828,21.4353085 129.65496,19.6501335 129.65496,17.453548 C129.65496,15.2569625 127.866828,13.4717751 125.666667,13.4717751 C123.466468,13.4717751 121.678323,15.2569625 121.678323,17.453548 C121.678323,19.6501335 123.466468,21.4353085 125.666667,21.4353085 Z M125.666667,40 C123.457535,40 121.666667,38.2091317 121.666667,36 C121.666667,33.7908558 123.457535,32 125.666667,32 C127.875811,32 129.666667,33.7908558 129.666667,36 C129.666667,38.2091317 127.875811,40 125.666667,40 Z"
                                    id="Combined-Shape-Copy"
                                    fill="url(#linearGradient-1)"
                                    fillRule="nonzero"
                                />
                                <path
                                    d="M16.2940015,24.4379502 C14.482436,26.3733976 12.2809397,27.3333333 9.67433079,27.3333333 C7.06770967,27.3333333 4.85859806,26.3656096 3.05459907,24.4379502 C1.23532795,22.5025028 0.333333333,20.1343181 0.333333333,17.3333208 C0.333333333,14.5323736 1.23532795,12.1641638 3.04695935,10.2286913 C4.85859806,8.30107462 7.06006996,7.33333333 9.66667887,7.33333333 C12.2732878,7.33333333 14.482436,8.30107462 16.286435,10.2286913 C18.0980005,12.1563004 19,14.5245103 19,17.3333208 C19,20.1421062 18.0980005,22.5025028 16.2940015,24.4379502 Z M6.77724167,20.5512282 C7.54929271,21.3852995 8.51243438,21.8022095 9.66667887,21.8022095 C10.8132836,21.8022095 11.7764375,21.3852995 12.5561527,20.5512282 C13.3281793,19.7172699 13.7179759,18.6472469 13.7179759,17.3333208 C13.7179759,16.0193947 13.3281793,14.9493716 12.5561527,14.1153882 C11.7840772,13.2813923 10.8209234,12.8644069 9.66667887,12.8644069 C8.51243438,12.8644069 7.55693243,13.2813923 6.77724167,14.1153882 C6.00519063,14.9493716 5.61534525,16.0193947 5.61534525,17.3333208 C5.61534525,18.6472469 6.00519063,19.7172699 6.77724167,20.5512282 Z"
                                    id="Shape"
                                    fill={textColor}
                                    fillRule="nonzero"
                                />
                                <path
                                    d="M32.5021458,6.90503172 C34.3565076,6.90503172 35.9017549,7.58396255 37.1380924,8.94954733 C38.3743095,10.3151198 39,12.1898996 39,14.5970315 L39,26 L33.7911597,26 L33.7911597,15.4147934 C33.7911597,14.3270309 33.5047068,13.4937488 32.9393589,12.9074336 C32.373999,12.3287553 31.6503571,12.0355977 30.768397,12.0355977 C29.7733819,12.0355977 28.9818876,12.3596724 28.4089939,12.9999384 C27.8285663,13.6403276 27.5421255,14.5970315 27.5421255,15.8622898 L27.5421255,26 L22.3333333,26 L22.3333333,0 L27.5421255,0 L27.5421255,9.17328324 C28.5823675,7.66111966 30.2331964,6.90503172 32.5021458,6.90503172 Z"
                                    id="Path"
                                    fill={textColor}
                                />
                                <path
                                    d="M55.6131522,7.86047645 L61,7.86047645 L61,26.7983469 L55.6131522,26.7983469 L55.6131522,25.0201672 C54.3425178,26.5623198 52.557282,27.3333333 50.2575444,27.3333333 C47.8876476,27.3333333 45.8607684,26.3656096 44.184686,24.4379502 C42.5086036,22.5102909 41.6666667,20.1421062 41.6666667,17.3333208 C41.6666667,14.5245103 42.5086036,12.1641638 44.184686,10.2286913 C45.8607684,8.30107462 47.8876476,7.33333333 50.2575444,7.33333333 C52.557282,7.33333333 54.3425178,8.10437825 55.6131522,9.64647435 L55.6131522,7.86047645 Z M48.2540518,20.7007078 C49.041412,21.5347791 50.0704529,21.9516892 51.3411496,21.9516892 C52.6118587,21.9516892 53.6408871,21.5347791 54.4282722,20.7007078 C55.21562,19.8667496 55.6131522,18.7416577 55.6131522,17.3333208 C55.6131522,15.9171079 55.21562,14.792016 54.4282722,13.965896 C53.6408871,13.1319126 52.6040549,12.7149147 51.3411496,12.7149147 C50.0704529,12.7149147 49.041412,13.1319126 48.2540518,13.965896 C47.4666791,14.7998794 47.0690971,15.9249838 47.0690971,17.3333208 C47.0690971,18.7416577 47.4588878,19.8667496 48.2540518,20.7007078 Z"
                                    id="Shape"
                                    fill={textColor}
                                    fillRule="nonzero"
                                />
                                <path
                                    d="M75.1688125,7.33333333 C77.0231743,7.33333333 78.5684216,8.02074157 79.8047591,9.40336511 C81.0409762,10.7860011 81.6666667,12.6841777 81.6666667,15.1213535 L81.6666667,26.6666667 L76.4578264,26.6666667 L76.4578264,15.9493762 C76.4578264,14.8479566 76.1713735,14.0043198 75.6060256,13.4106462 C75.0406657,12.8247922 74.3170237,12.5279492 73.4350637,12.5279492 C72.4400485,12.5279492 71.6485543,12.8560329 71.0756605,13.5043809 C70.495233,14.1527413 70.2087922,15.1213535 70.2087922,16.4024354 L70.2087922,26.6666667 L65,26.6666667 L65,7.86451299 L70.2087922,7.86451299 L70.2087922,9.62990715 C71.2415004,8.09885586 72.899863,7.33333333 75.1688125,7.33333333 Z"
                                    id="Path"
                                    fill={textColor}
                                />
                                <path
                                    d="M99.6131522,7.86047645 L105,7.86047645 L105,26.7983469 L99.6131522,26.7983469 L99.6131522,25.0201672 C98.3425178,26.5623198 96.5572944,27.3333333 94.2575569,27.3333333 C91.88766,27.3333333 89.8607684,26.3656096 88.184686,24.4379502 C86.5086085,22.5102909 85.6666667,20.1421062 85.6666667,17.3333208 C85.6666667,14.5245103 86.5086085,12.1641638 88.184686,10.2286913 C89.8607684,8.30107462 91.88766,7.33333333 94.2575569,7.33333333 C96.5572944,7.33333333 98.3425178,8.10437825 99.6131522,9.64647435 L99.6131522,7.86047645 Z M92.2462604,20.7007078 C93.0336207,21.5347791 94.0626616,21.9516892 95.3333582,21.9516892 C96.6040549,21.9516892 97.6331082,21.5347791 98.4204311,20.7007078 C99.2077789,19.8667496 99.6054356,18.7416577 99.6054356,17.3333208 C99.6054356,15.9171079 99.2077789,14.792016 98.4204311,13.965896 C97.6331082,13.1319126 96.5962636,12.7149147 95.3333582,12.7149147 C94.0626616,12.7149147 93.0336207,13.1319126 92.2462604,13.965896 C91.4588878,14.7998794 91.0613058,15.9249838 91.0613058,17.3333208 C91.0613058,18.7416577 91.4588878,19.8667496 92.2462604,20.7007078 Z"
                                    id="Shape"
                                    fill={textColor}
                                    fillRule="nonzero"
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    },
);

export { HomeIcon };

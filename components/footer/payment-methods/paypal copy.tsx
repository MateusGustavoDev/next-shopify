export function Paypal({ size = 24 }: { size?: number }) {
    const aspectRatio = 24 / 16; // Largura / Altura original do SVG
    const width = size;
    const height = size / aspectRatio;

    return <svg width={width}
        height={height}
        viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_9_1721)">
            <path d="M0 2C0 0.895431 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V14C24 15.1046 23.1046 16 22 16H2C0.89543 16 0 15.1046 0 14V2Z" fill="#CCDEFF" />
            <path d="M5.38541 5.75872C5.13473 5.58638 4.80761 5.50001 4.40405 5.50001H2.8417C2.71798 5.50001 2.64964 5.56188 2.63665 5.6855L2.00199 9.66943C1.9954 9.70856 2.00519 9.74434 2.03127 9.77687C2.05721 9.80947 2.08983 9.82567 2.1289 9.82567H2.87101C3.00117 9.82567 3.07271 9.76395 3.08584 9.64018L3.26158 8.56612C3.268 8.51407 3.29089 8.47174 3.32996 8.43915C3.369 8.40662 3.41783 8.38534 3.47642 8.37561C3.53501 8.36594 3.59025 8.36104 3.64242 8.36104C3.69445 8.36104 3.75626 8.36435 3.82798 8.37083C3.89952 8.37731 3.94513 8.3805 3.96468 8.3805C4.52448 8.3805 4.96389 8.22276 5.28292 7.90693C5.6018 7.59127 5.76142 7.15354 5.76142 6.59356C5.76142 6.20949 5.63597 5.93123 5.38541 5.75863V5.75872ZM4.57988 6.95497C4.54723 7.18285 4.4627 7.3325 4.326 7.40413C4.18928 7.47585 3.99399 7.51155 3.74014 7.51155L3.41789 7.52128L3.58393 6.47644C3.59688 6.4049 3.63917 6.36908 3.71083 6.36908H3.89642C4.15668 6.36908 4.34558 6.4066 4.46276 6.48133C4.57988 6.55625 4.61895 6.71417 4.57988 6.95497Z" fill="#003087" />
            <path d="M21.8729 5.5H21.1504C21.0786 5.5 21.0364 5.53582 21.0235 5.60748L20.3888 9.6696L20.379 9.68912C20.379 9.72183 20.392 9.7526 20.4181 9.78191C20.444 9.81116 20.4767 9.82581 20.5157 9.82581H21.1603C21.2837 9.82581 21.3521 9.76409 21.3653 9.64032L22 5.64655V5.63685C22 5.54567 21.9575 5.50012 21.8729 5.50012V5.5Z" fill="#009CDE" />
            <path d="M13.1434 7.07225C13.1434 7.03977 13.1304 7.00879 13.1045 6.97957C13.0784 6.95029 13.0491 6.93555 13.0166 6.93555H12.2647C12.193 6.93555 12.1344 6.96826 12.0889 7.03318L11.0539 8.55652L10.6242 7.09183C10.5915 6.98775 10.52 6.93555 10.4094 6.93555H9.67693C9.64431 6.93555 9.61503 6.95023 9.58915 6.97957C9.56303 7.00879 9.55008 7.03983 9.55008 7.07225C9.55008 7.08535 9.61356 7.27732 9.74047 7.64838C9.86738 8.01955 10.0041 8.41991 10.1506 8.84958C10.2971 9.27916 10.3735 9.50713 10.38 9.53295C9.84619 10.2622 9.57939 10.6527 9.57939 10.7047C9.57939 10.7894 9.62162 10.8317 9.70633 10.8317H10.4582C10.5298 10.8317 10.5883 10.7992 10.634 10.7341L13.124 7.14057C13.137 7.12767 13.1434 7.10499 13.1434 7.07222V7.07225Z" fill="#003087" />
            <path d="M20.1448 6.93558H19.4027C19.3114 6.93558 19.2563 7.04303 19.2367 7.2579C19.0673 6.99758 18.7583 6.86724 18.309 6.86724C17.8403 6.86724 17.4415 7.04303 17.1129 7.39457C16.7841 7.7461 16.6198 8.1596 16.6198 8.63476C16.6198 9.01892 16.7321 9.32485 16.9566 9.55261C17.1812 9.7806 17.4822 9.89438 17.8599 9.89438C18.0487 9.89438 18.2407 9.85525 18.436 9.7772C18.6313 9.69909 18.7841 9.59499 18.895 9.46474C18.895 9.47127 18.8883 9.50046 18.8755 9.55252C18.8623 9.60469 18.8559 9.64388 18.8559 9.66969C18.8559 9.77398 18.8981 9.82591 18.9829 9.82591H19.6567C19.7802 9.82591 19.8519 9.76419 19.8714 9.64041L20.2718 7.0918C20.2782 7.0527 20.2685 7.01698 20.2425 6.98438C20.2163 6.95191 20.1838 6.93558 20.1448 6.93558ZM18.8705 8.85933C18.7045 9.02208 18.5043 9.10341 18.27 9.10341C18.0811 9.10341 17.9283 9.05142 17.811 8.94719C17.6938 8.84327 17.6352 8.70003 17.6352 8.51755C17.6352 8.27687 17.7166 8.07325 17.8794 7.90727C18.0419 7.74127 18.2439 7.65829 18.4848 7.65829C18.6669 7.65829 18.8183 7.71199 18.9388 7.81935C19.0592 7.92679 19.1196 8.07489 19.1196 8.26373C19.1195 8.49806 19.0365 8.69666 18.8705 8.85933Z" fill="#009CDE" />
            <path d="M9.05202 6.93558H8.30989C8.21862 6.93558 8.16341 7.04303 8.14386 7.2579C7.96809 6.99758 7.65885 6.86724 7.2162 6.86724C6.74749 6.86724 6.34871 7.04303 6.02001 7.39457C5.69122 7.7461 5.52692 8.1596 5.52692 8.63476C5.52692 9.01892 5.63923 9.32485 5.86382 9.55261C6.08842 9.7806 6.38942 9.89438 6.76704 9.89438C6.94922 9.89438 7.13812 9.85525 7.33337 9.7772C7.52866 9.69909 7.68491 9.59499 7.80208 9.46474C7.77597 9.54279 7.76301 9.61117 7.76301 9.66969C7.76301 9.77398 7.80531 9.82591 7.88995 9.82591H8.56371C8.6873 9.82591 8.75899 9.76419 8.77854 9.64041L9.17887 7.0918C9.18529 7.0527 9.17556 7.01698 9.14959 6.98438C9.12354 6.95191 9.09103 6.93558 9.05202 6.93558ZM7.77773 8.86416C7.61169 9.02384 7.40817 9.10341 7.16746 9.10341C6.97856 9.10341 6.82721 9.05142 6.71337 8.94719C6.59939 8.84327 6.54247 8.70003 6.54247 8.51755C6.54247 8.27687 6.6238 8.07325 6.78662 7.90727C6.94925 7.74127 7.15107 7.65826 7.39202 7.65826C7.57421 7.65826 7.72556 7.71199 7.84611 7.81935C7.96645 7.92679 8.02674 8.07489 8.02674 8.26373C8.02671 8.5046 7.94374 8.70484 7.77773 8.86416Z" fill="#003087" />
            <path d="M16.4782 5.75871C16.2275 5.58638 15.9005 5.5 15.4968 5.5H13.9442C13.814 5.5 13.7423 5.56187 13.7294 5.6855L13.0947 9.66942C13.0881 9.70855 13.0979 9.74433 13.124 9.77687C13.1498 9.80946 13.1825 9.82567 13.2216 9.82567H14.0223C14.1004 9.82567 14.1524 9.7834 14.1786 9.69876L14.3543 8.56611C14.3608 8.51406 14.3836 8.47174 14.4227 8.43914C14.4618 8.40661 14.5105 8.38533 14.5692 8.3756C14.6277 8.36593 14.683 8.36103 14.7352 8.36103C14.7872 8.36103 14.849 8.36435 14.9207 8.37082C14.9922 8.3773 15.038 8.38049 15.0574 8.38049C15.6173 8.38049 16.0566 8.22275 16.3756 7.90692C16.6946 7.59126 16.8541 7.15353 16.8541 6.59355C16.8541 6.20948 16.7287 5.93119 16.4782 5.75862V5.75871ZM15.4773 7.36502C15.3341 7.46265 15.1192 7.51145 14.8329 7.51145L14.5204 7.52124L14.6864 6.47637C14.6993 6.40486 14.7416 6.36898 14.8133 6.36898H14.989C15.1322 6.36898 15.2461 6.37552 15.3309 6.3885C15.4153 6.40158 15.4968 6.4422 15.575 6.51052C15.6531 6.57889 15.6921 6.67822 15.6921 6.80835C15.6921 7.08187 15.6204 7.26731 15.4773 7.36502Z" fill="#009CDE" />
        </g>
        <defs>
            <clipPath id="clip0_9_1721">
                <rect width="24" height="16" fill="white" />
            </clipPath>
        </defs>
    </svg>

}
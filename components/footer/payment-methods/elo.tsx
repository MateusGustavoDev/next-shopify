export function Elo({ size = 24 }: { size?: number }) {
  const aspectRatio = 24 / 16 // Largura / Altura original do SVG
  const width = size
  const height = size / aspectRatio

  return (
    <svg width={width} height={height} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_9_1702)">
        <path
          d="M0 2C0 0.895431 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V14C24 15.1046 23.1046 16 22 16H2C0.89543 16 0 15.1046 0 14V2Z"
          fill="#E7E4E5"
        />
        <path
          d="M4.97826 5.95633C5.1919 5.88407 5.42124 5.84637 5.66001 5.84637C6.70305 5.84637 7.5733 6.58781 7.77123 7.57116L9.24783 7.26956C8.90852 5.59817 7.43193 4.33835 5.66001 4.33835C5.25473 4.33835 4.86516 4.40432 4.50072 4.52685L4.97826 5.95633Z"
          fill="#FFF100"
        />
        <path
          d="M3.23469 10.7443L4.23375 9.61328C3.78763 9.21742 3.50802 8.64249 3.50802 7.99844C3.50802 7.35753 3.78763 6.77946 4.23375 6.38674L3.23469 5.25887C2.47754 5.9312 2 6.90827 2 8.00158C2 9.09175 2.47754 10.0719 3.23469 10.7443Z"
          fill="#00A3DF"
        />
        <path
          d="M7.7713 8.43201C7.57023 9.41537 6.70312 10.1537 5.66008 10.1537C5.42131 10.1537 5.19197 10.116 4.97519 10.0437L4.49765 11.4732C4.86209 11.5957 5.2548 11.6617 5.66008 11.6617C7.432 11.6617 8.90859 10.405 9.2479 8.73362L7.7713 8.43201Z"
          fill="#EE4023"
        />
        <path
          d="M14.1677 9.44364C13.9227 9.68244 13.5928 9.82693 13.2283 9.82065C12.977 9.81751 12.7446 9.7421 12.5497 9.61644L12.0596 10.3956C12.3957 10.6061 12.7885 10.7317 13.2158 10.738C13.8347 10.7474 14.4001 10.5024 14.8118 10.1034L14.1677 9.44364ZM13.2818 6.26738C12.0502 6.24853 11.0323 7.23502 11.0134 8.46657C11.0071 8.9284 11.1391 9.36196 11.3747 9.72011L15.4212 7.989C15.1951 7.01825 14.328 6.28623 13.2818 6.26738H13.2818ZM11.9403 8.64248C11.934 8.59221 11.9308 8.5388 11.9308 8.48539C11.9434 7.75966 12.5404 7.17844 13.2661 7.19101C13.6619 7.19729 14.0137 7.37637 14.2494 7.65912L11.9403 8.64248ZM16.6936 5.262V9.57556L17.4414 9.88659L17.0864 10.738L16.3449 10.4301C16.1784 10.3578 16.0653 10.2479 15.9805 10.1222C15.8988 9.99655 15.836 9.82058 15.836 9.58813V5.262H16.6936ZM19.3924 7.25698C19.5244 7.213 19.6626 7.19101 19.8103 7.19101C20.448 7.19101 20.9758 7.64341 21.0984 8.24348L22 8.05812C21.7927 7.03706 20.891 6.27049 19.8103 6.27049C19.5621 6.27049 19.3233 6.31133 19.1034 6.38359L19.3924 7.25698ZM18.3273 10.1756L18.9368 9.48759C18.6635 9.24568 18.4938 8.89381 18.4938 8.5011C18.4938 8.10839 18.6666 7.75652 18.9368 7.51775L18.3273 6.82971C17.8655 7.23813 17.5733 7.8382 17.5733 8.50424C17.5733 9.17028 17.8655 9.76721 18.3273 10.1756ZM21.0984 8.76811C20.9758 9.36821 20.4449 9.82058 19.8103 9.82058C19.6658 9.82058 19.5244 9.79545 19.3924 9.7515L19.1003 10.6249C19.3233 10.7003 19.562 10.7411 19.8103 10.7411C20.891 10.7411 21.7927 9.97456 22 8.9535L21.0984 8.76811Z"
          fill="#231F20"
        />
      </g>
      <defs>
        <clipPath id="clip0_9_1702">
          <rect width={24} height={16} fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

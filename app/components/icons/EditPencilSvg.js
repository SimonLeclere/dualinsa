export default function EditPencilSvg({ color = "white", ...props }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.19599 2.4431L10.1997 1.43938C11.24 0.39911 12.9266 0.399112 13.9669 1.43939C15.0071 2.47966 15.0071 4.16628 13.9669 5.20655L12.9632 6.21026L9.19599 2.4431ZM8.0124 3.62669L1.44866 10.1904C0.808195 10.8309 0.471563 13.8719 1.02949 14.4299C1.58741 14.9878 4.5644 14.609 5.21582 13.9576L11.7796 7.39385L8.0124 3.62669Z"
        fill={color}
      />
    </svg>
  );
}

import parser from 'html-react-parser';

export default function HtmlParser({ content = "",className="" }) {


    return (
        <div className={`tiptap tiptap-parse ${className}`}>
            {
                parser(content)
            }
        </div>
    )
}

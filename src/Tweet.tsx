import React from "react";

type Props = {
    author: string;
    text: string;
}

function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

class Tweet extends React.Component<Props> {

    render() {
        const now = new Date();
        const date = formatDate(now);
        const {author, text} = this.props;

        return (
            <div className="tweet-container centered-text">
                <b className="user">{author}</b>
                <time className="date">{date}</time>
                <p className="text">
                    {text}
                </p>
            </div>
        );
    }
}

export default Tweet;
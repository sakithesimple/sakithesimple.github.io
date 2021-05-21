class Question
{
    constructor(question, choices, rightAnswer, markKey, imgsrc)
    {
        this.question = question;
        this.choices = choices;
        this.rightAnswer = rightAnswer;
        this.markKey = markKey;
        this.imgsrc = imgsrc;
    }
    mark(answer)
    {
        if (this.rightAnswer == "too complicated")
        {
            let answers = answer.split(/\n|,|and/);
            let rightAnswers = 0;
            // keep track of which answers are left so that no horcrux is counted more than once
            let bs = [true, true, true, true, true, true, true];
            for (let i = 0; i < answers.length; i++)
            {
                let a = answers[i].toLowerCase();
                if (bs[0] && a.includes("ring") && a.includes("marvolo"))
                {
                    rightAnswers++;
                    bs[0] = false;
                }
                else if (bs[1] && (a.includes("goblet") || a.includes("cup")) && (a.includes("helga") || a.includes("hufflepuff")))
                {
                    rightAnswers++;
                    bs[1] = false;
                }
                else if (bs[2] && a.includes("locket") && (a.includes("salazar") || a.includes("slytherin")))
                {
                    rightAnswers++;
                    bs[2] = false;
                }
                else if (bs[3] && (a.includes("diadem") || a.includes("tiara")) && (a.includes("rowena") || a.includes("ravenclaw")))
                {
                    rightAnswers++;
                    bs[3] = false;
                }
                else if (bs[4] && a.includes("diary") && (a.includes("tom") || a.includes("riddle")))
                {
                    rightAnswers++;
                    bs[4] = false;
                }
                else if (bs[5] && a.includes("nagini"))
                {
                    rightAnswers++;
                    bs[5] = false;
                }
                else if (bs[6] && a.includes("harry"))
                {
                    rightAnswers++;
                    bs[6] = false;
                }
            }
            return this.markKey[rightAnswers];
        }
        else if (this.rightAnswer == null)
        {
            return this.markKey[answer];
        }
        else
        {
            if (answer.toLowerCase().includes(this.rightAnswer))
            {
                return this.markKey[0];
            }
            else
            {
                return this.markKey[1];
            }
        }
    }
}
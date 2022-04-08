// fetch the APIs for the top stories in Hacker News ======================
fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
.then((data) => data.json())
.then((storyIds) => {
    // get the APIs for the first 100`s top stories
    for (i = 0; i < 100; i++){
        //get DOM elements
        const parent = document.querySelector('table tbody');

        //Create DOM elements 
        const child = document.createElement('tr');
        const childBy = document.createElement('td');
        const childScore = document.createElement('td');
        const childTitle = document.createElement('td');
        const childComment = document.createElement('td');
        const childLink = document.createElement('a');
        
        
        let comments = 0;
        //fetch all the API's info based on its ID.
        fetch('https://hacker-news.firebaseio.com/v0/item/'+storyIds[i]+'.json?print=pretty')
        .then((data) =>  data.json())
        .then((storyInfo) => {

            //DOM mods to HTML.
            parent.className = 'parent';
            child.className = 'child';
            childBy.className = 'child';
            childBy.innerText = 'By: ' + storyInfo.by;
            childScore.className = 'child';
            childScore.innerText ='Score: ' + storyInfo.score;
            childLink.href = storyInfo.url;
            childLink.innerText = storyInfo.title;
            childComment.innerHTML = `<a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"></a>`;
            childComment.id = storyIds[i];
            
            //Correct for undefined number of descendents
            if(!isNaN(storyInfo.descendants)){
                comments += storyInfo.descendants;
            }
            childComment.firstChild.innerText = ` ${comments} 💬`;

            //Append all the created DOM elements to my HTML table.
            childTitle.appendChild(childLink);
            child.appendChild(childTitle);
            child.appendChild(childScore);
            child.appendChild(childBy);
            child.appendChild(childComment);
            parent.appendChild(child);

            childComment.firstChild.addEventListener('click', function(){
                const offcanvasBody = document.querySelector('.offcanvas-body')
                offcanvasBody.innerHTML = '';

                //Loop through all the the index inside the comments array's based on its ID.
                for(i=0; i< storyInfo.kids.length; i++){
                        
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyInfo.kids[i]}.json?print=pretty`)
                    .then((data) =>  data.json())
                    .then((viewCommentsKidsId) =>{
                        console.log(viewCommentsKidsId);
                        console.log(new Date(1649359169));
                        //Create DOM elements
                        const commentsTr = document.createElement('div');
                        const commentsByTd = document.createElement('div');
                        const commentsTextTd = document.createElement('div');
                        const commentsTimestamp = document.createElement('div');
                        const commentsBreak = document.createElement('div');
                        //set my new DIV innerHtml
                        commentsTextTd.innerHTML = viewCommentsKidsId.text;
                        commentsByTd.innerHTML = 'By: ' + viewCommentsKidsId.by;
                        commentsTimestamp.innerHTML = new Date(viewCommentsKidsId.time);
                        commentsBreak.innerHTML = '--------------------------------------------------------------------'
                        //set my new DIV classNames to match 
                        commentsTr.className = 'comment';
                        commentsByTd.className = 'comment-by';
                        commentsTimestamp.className = 'commentTimestamp';
                        //append my Div's to my TBody.
                        commentsTr.appendChild(commentsTextTd);
                        commentsTr.appendChild(commentsByTd);
                        commentsTr.appendChild(commentsTimestamp);
                        commentsTr.appendChild(commentsBreak);
                        offcanvasBody.appendChild(commentsTr);
                    });
                }
            })
        });
    }
})


    

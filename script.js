const quotes = {
    motivational: [
      { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "Learn as if you will live forever, live like you will die tomorrow.", author: "Mahatma Gandhi"},
      { text: "I never dreamed about success. I worked for it.", author: "Estée Lauder"},
      { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers"},
      {text: "Either you run the day or the day runs you." ,author: "Jim Rohn"},
      {text: "Try not to become a man of success, but rather become a man of value.", author:"Albert Einstein"}
    ],
    humor: [
      { text: "I’m writing a book. I’ve got the page numbers done.", author: "Steven Wright" },
      { text: "I’m writing a book. I’ve got the page numbers done.", author: "Steven Wright" },
      { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text:"So many books, so little time.",author:"Frank Zappa"},
    {text:"A day without sunshine is like, you know, night.",author:"Steve Martin"},
    {text:"I love mankind ... it's people I can't stand!!",author:"Charles M. Schulz"},
    {text:"Start every day off with a smile and get it over with.",author:"W. C. Fields"},
    {text:"A rich man is nothing but a poor man with money.",author:"W. C. Fields"},
    {text:"Sometimes your best investments are the ones you don't make.",author:"Donald Trump"}
    ],
    inspiration: [
        { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
        { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
        {text:"If I cannot do great things, I can do small things in a great way.",author:"Martin Luther King, Jr."},
        {text:"Believe you can and you're halfway there.",author:"Theodore Roosevelt"},
        {text:"We will fail when we fail to try.",author:"Rosa Parks"},
        {text:"A person who never made a mistake never tried anything new.",author:"Albert Einstein"},
        {text:"You must do the things you think you cannot do.",author:"Eleanor Roosevelt"},
        {text:"Attitude is the 'little' thing that makes a big difference.",author:"Winston Churchill"},
      { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" }
    ]
  };
  
  let currentCategory = "";
  let currentQuoteIndex = 0;
  let currentQuote = {};
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  
  function getCategoryQuote(category) {
    currentCategory = category;
    currentQuoteIndex = 0;
    currentQuote = quotes[category][currentQuoteIndex];
    displayQuote(currentQuote);
  }
  
  
  function displayQuote(quote) {
    document.getElementById("quote-text").textContent = `"${quote.text}"`;
    document.getElementById("quote-author").textContent = `- ${quote.author}`;
  }
  
  
  function newQuote() {
    const randomCategory = Object.keys(quotes)[Math.floor(Math.random() * Object.keys(quotes).length)];
    const randomQuoteIndex = Math.floor(Math.random() * quotes[randomCategory].length);
    currentQuote = quotes[randomCategory][randomQuoteIndex];
    displayQuote(currentQuote);
  }
  
  
  function addFavorite() {
    if (!favorites.some(fav => fav.text === currentQuote.text && fav.author === currentQuote.author)) {
      favorites.push(currentQuote);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Quote added to favorites!");
    } else {
      alert("This quote is already in your favorites.");
    }
  }
  
  
  function shareQuote(platform) {
    const url = encodeURIComponent(window.location.href);
    const quote = encodeURIComponent(`${currentQuote.text} - ${currentQuote.author}`);
  
    let shareURL = "";
    if (platform === "facebook") {
      shareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
    } else if (platform === "twitter") {
      shareURL = `https://twitter.com/intent/tweet?text=${quote}&url=${url}`;
    } else if (platform === "instagram") {
      alert("Instagram sharing is not supported in this demo.");
      return;
    }
  
    window.open(shareURL, "_blank");
  }
  
  
  if (window.location.pathname.includes("favorites.html")) {
    const favoritesList = document.getElementById("favorites-list");
    favorites.forEach((fav, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `"${fav.text}" - ${fav.author} 
        <button class="remove-favorite" onclick="removeFavorite(${index})">Remove</button>`;
      favoritesList.appendChild(listItem);
    });
  }
  
  
  function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.location.reload(); 
  }
  
  // Initial quote display
  getCategoryQuote("motivational");
  

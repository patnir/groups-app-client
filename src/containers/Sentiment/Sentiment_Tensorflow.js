import React, { Component } from "react";
import { Alert, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import nGram from "word-ngrams";
import * as tf from "@tensorflow/tfjs";

// const word_index = [{"the": 1}, {"a": 2}, {"and": 3}, {"of": 4}, {"to": 5}, {"is": 6}, {"in": 7}, {"that": 8}, {"it": 9}, {"as": 10}, {"with": 11}, {"for": 12}, {"this": 13}, {"his": 14}, {"film": 15}, {"but": 16}, {"he": 17}, {"i": 18}, {"on": 19}, {"are": 20}, {"by": 21}, {"be": 22}, {"one": 23}, {"an": 24}, {"movie": 25}, {"not": 26}, {"who": 27}, {"at": 28}, {"was": 29}, {"from": 30}, {"have": 31}, {"has": 32}, {"her": 33}, {"you": 34}, {"all": 35}, {"they": 36}, {"it": s,37}, {"like": 38}, {"so": 39}, {"out": 40}, {"about": 41}, {"up": 42}, {"more": 43}, {"when": 44}, {"which": 45}, {"or": 46}, {"what": 47}, {"their": 48}, {"some": 49}, {"just": 50}, {"if": 51}, {"there": 52}, {"she": 53}, {"into": 54}, {"him": 55}, {"even": 56}, {"than": 57}, {"good": 58}, {"only": 59}, {"no": 60}, {"time": 61}, {"we": 62}, {"most": 63}, {"its": 64}, {"can": 65}, {"will": 66}, {"story": 67}, {"would": 68}, {"been": 69}, {"much": 70}, {"get": 71}, {"do": 72}, {"also": 73}, {"other": 74}, {"two": 75}, {"well": 76}, {"character": 77}, {"them": 78}, {"very": 79}, {"first": 80}, {"characters": 81}, {"see": 82}, {"after": 83}, {"way": 84}, {"because": 85}, {"make": 86}, {"too": 87}, {"off": 88}, {"any": 89}, {"does": 90}, {"had": 91}, {"really": 92}, {"life": 93}, {"how": 94}, {"while": 95}, {"films": 96}, {"plot": 97}, {"where": 98}, {"little": 99}, {"over": 100}, {"bad": 101}, {"me": 102}, {"people": 103}, {"never": 104}, {"scene": 105}, {"then": 106}, {"my": 107}, {"could": 108}, {"being": 109}, {"man": 110}, {"best": 111}, {"doesn": t,112}, {"these": 113}, {"scenes": 114}, {"new": 115}, {"many": 116}, {"don": t,117}, {"were": 118}, {"such": 119}, {"movies": 120}, {"action": 121}, {"know": 122}, {"director": 123}, {"he": s,124}, {"go": 125}, {"through": 126}, {"love": 127}, {"here": 128}, {"another": 129}, {"great": 130}, {"big": 131}, {"us": 132}, {"made": 133}, {"back": 134}, {"still": 135}, {"end": 136}, {"seems": 137}, {"there": s,138}, {"work": 139}, {"something": 140}, {"those": 141}, {"world": 142}, {"now": 143}, {"however": 144}, {"makes": 145}, {"down": 146}, {"between": 147}, {"real": 148}, {"every": 149}, {"though": 150}, {"before": 151}, {"better": 152}, {"few": 153}, {"take": 154}, {"same": 155}, {"both": 156}, {"going": 157}, {"performance": 158}, {"seen": 159}, {"should": 160}, {"enough": 161}, {"around": 162}, {"role": 163}, {"audience": 164}, {"funny": 165}, {"your": 166}, {"why": 167}, {"look": 168}, {"isn": t,169}, {"think": 170}, {"almost": 171}, {"old": 172}, {"long": 173}, {"gets": 174}, {"actually": 175}, {"things": 176}, {"years": 177}, {"although": 178}, {"comedy": 179}, {"last": 180}, {"nothing": 181}, {"right": 182}, {"thing": 183}, {"may": 184}, {"own": 185}, {"played": 186}, {"fact": 187}, {"that": s,188}, {"ever": 189}, {"script": 190}, {"say": 191}, {"plays": 192}, {"come": 193}, {"find": 194}, {"comes": 195}, {"cast": 196}, {"year": 197}, {"did": 198}, {"john": 199}, {"since": 200}, {"part": 201}, {"star": 202}, {"young": 203}, {"screen": 204}, {"acting": 205}, {"actors": 206}, {"without": 207}, {"original": 208}, {"show": 209}, {"again": 210}, {"point": 211}, {"least": 212}, {"three": 213}, {"guy": 214}, {"lot": 215}, {"takes": 216}, {"quite": 217}, {"course": 218}, {"each": 219}, {"far": 220}, {"day": 221}, {"away": 222}, {"interesting": 223}, {"family": 224}, {"i": m,225}, {"can": t,226}, {"once": 227}, {"effects": 228}, {"rather": 229}, {"minutes": 230}, {"goes": 231}, {"might": 232}, {"must": 233}, {"making": 234}, {"watch": 235}, {"hard": 236}, {"himself": 237}, {"place": 238}, {"during": 239}, {"anything": 240}, {"our": 241}, {"always": 242}, {"high": 243}, {"times": 244}, {"set": 245}, {"fun": 246}, {"yet": 247}, {"film": s,248}, {"sense": 249}, {"kind": 250}, {"bit": 251}, {"special": 252}, {"instead": 253}, {"trying": 254}, {"want": 255}, {"didn": t,256}, {"hollywood": 257}, {"job": 258}, {"picture": 259}, {"seem": 260}, {"wife": 261}, {"give": 262}, {"help": 263}, {"together": 264}, {"half": 265}, {"along": 266}, {"probably": 267}, {"money": 268}, {"pretty": 269}, {"american": 270}, {"actor": 271}, {"home": 272}, {"sure": 273}, {"dialogue": 274}, {"everything": 275}, {"becomes": 276}, {"series": 277}, {"woman": 278}, {"become": 279}, {"having": 280}, {"black": 281}, {"gives": 282}, {"given": 283}, {"men": 284}, {"watching": 285}, {"whole": 286}, {"got": 287}, {"feel": 288}, {"wants": 289}, {"everyone": 290}, {"looking": 291}, {"done": 292}, {"death": 293}, {"father": 294}, {"10": 295}, {"music": 296}, {"less": 297}, {"sex": 298}, {"perhaps": 299}, {"especially": 300}, {"mind": 301}, {"next": 302}, {"moments": 303}, {"they": re,304}, {"line": 305}, {"looks": 306}, {"completely": 307}, {"night": 308}, {"city": 309}, {"girl": 310}, {"rest": 311}, {"reason": 312}, {"play": 313}, {"simply": 314}, {"whose": 315}, {"horror": 316}, {"performances": 317}, {"case": 318}, {"different": 319}, {"dead": 320}, {"small": 321}, {"second": 322}, {"michael": 323}, {"couple": 324}, {"put": 325}, {"evil": 326}, {"lost": 327}, {"until": 328}, {"several": 329}, {"2": 330}, {"james": 331}, {"mother": 332}, {"itself": 333}, {"she": s,334}, {"entire": 335}, {"ending": 336}, {"i": ve,337}, {"turns": 338}, {"humor": 339}, {"written": 340}, {"getting": 341}, {"begins": 342}, {"shows": 343}, {"comic": 344}, {"left": 345}, {"wrong": 346}, {"thought": 347}, {"human": 348}, {"later": 349}, {"head": 350}, {"main": 351}, {"friends": 352}, {"town": 353}, {"name": 354}, {"called": 355}, {"soon": 356}, {"stars": 357}, {"anyone": 358}, {"idea": 359}, {"someone": 360}, {"use": 361}, {"problem": 362}, {"keep": 363}, {"house": 364}, {"school": 365}, {"friend": 366}, {"often": 367}, {"turn": 368}, {"hour": 369}, {"found": 370}, {"sequence": 371}, {"group": 372}, {"top": 373}, {"despite": 374}, {"hand": 375}, {"either": 376}, {"true": 377}, {"full": 378}, {"unfortunately": 379}, {"boy": 380}, {"s": 381}, {"believe": 382}, {"named": 383}, {"playing": 384}, {"against": 385}, {"said": 386}, {"tries": 387}, {"david": 388}, {"based": 389}, {"else": 390}, {"war": 391}, {"under": 392}, {"doing": 393}, {"nice": 394}, {"certainly": 395}, {"moment": 396}, {"live": 397}, {"finally": 398}, {"used": 399}, {"camera": 400}, {"tell": 401}, {"face": 402}, {"final": 403}, {"works": 404}, {"relationship": 405}, {"run": 406}, {"able": 407}, {"directed": 408}, {"mr": 409}, {"video": 410}, {"lives": 411}, {"supposed": 412}, {"you": re,413}, {"alien": 414}, {"style": 415}, {"side": 416}, {"behind": 417}, {"worst": 418}, {"start": 419}, {"days": 420}, {"need": 421}, {"summer": 422}, {"person": 423}, {"shot": 424}, {"maybe": 425}, {"perfect": 426}, {"lines": 427}, {"care": 428}, {"self": 429}, {"starts": 430}, {"finds": 431}, {"past": 432}, {"entertaining": 433}, {"worth": 434}, {"book": 435}, {"son": 436}, {"kids": 437}, {"tv": 438}, {"seeing": 439}, {"car": 440}, {"early": 441}, {"including": 442}, {"short": 443}, {"running": 444}, {"game": 445}, {"matter": 446}, {"dark": 447}, {"opening": 448}, {"wasn": t,449}, {"major": 450}, {"upon": 451}, {"try": 452}, {"beautiful": 453}, {"nearly": 454}, {"robert": 455}, {"close": 456}, {"fine": 457}, {"let": 458}, {"kevin": 459}, {"fight": 460}, {"throughout": 461}, {"violence": 462}, {"order": 463}, {"production": 464}, {"white": 465}, {"problems": 466}, {"already": 467}, {"drama": 468}, {"earth": 469}, {"daughter": 470}, {"team": 471}, {"act": 472}, {"boring": 473}, {"children": 474}, {"known": 475}, {"review": 476}, {"knows": 477}, {"who": s,478}, {"jack": 479}, {"example": 480}, {"eyes": 481}, {"supporting": 482}, {"jokes": 483}, {"version": 484}, {"writer": 485}, {"direction": 486}, {"hit": 487}, {"others": 488}, {"deep": 489}, {"roles": 490}, {"title": 491}, {"heart": 492}, {"exactly": 493}, {"sort": 494}, {"sequences": 495}, {"body": 496}, {"fiction": 497}, {"genre": 498}, {"women": 499}, {"computer": 500}];

export default class Sentiment_Comprehend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      sentimentText: "",
      tensor_sentiment: null,
      alertStyle: "warning",
      word_counts: null,
      review: "",
      currentPrediction: 0
    };

    this.word_index = {
      the: 1,
      a: 2,
      and: 3,
      of: 4,
      to: 5,
      is: 6,
      in: 7,
      that: 8,
      it: 9,
      as: 10,
      with: 11,
      for: 12,
      this: 13,
      his: 14,
      film: 15,
      but: 16,
      he: 17,
      i: 18,
      on: 19,
      are: 20,
      by: 21,
      be: 22,
      one: 23,
      an: 24,
      movie: 25,
      not: 26,
      who: 27,
      at: 28,
      was: 29,
      from: 30,
      have: 31,
      has: 32,
      her: 33,
      you: 34,
      all: 35,
      they: 36,
      "it's": 37,
      like: 38,
      so: 39,
      out: 40,
      about: 41,
      up: 42,
      more: 43,
      when: 44,
      which: 45,
      or: 46,
      what: 47,
      their: 48,
      some: 49,
      just: 50,
      if: 51,
      there: 52,
      she: 53,
      into: 54,
      him: 55,
      even: 56,
      than: 57,
      good: 58,
      only: 59,
      no: 60,
      time: 61,
      we: 62,
      most: 63,
      its: 64,
      can: 65,
      will: 66,
      story: 67,
      would: 68,
      been: 69,
      much: 70,
      get: 71,
      do: 72,
      also: 73,
      other: 74,
      two: 75,
      well: 76,
      character: 77,
      them: 78,
      very: 79,
      first: 80,
      characters: 81,
      see: 82,
      after: 83,
      way: 84,
      because: 85,
      make: 86,
      too: 87,
      off: 88,
      any: 89,
      does: 90,
      had: 91,
      really: 92,
      life: 93,
      how: 94,
      while: 95,
      films: 96,
      plot: 97,
      where: 98,
      little: 99,
      over: 100,
      bad: 101,
      me: 102,
      people: 103,
      never: 104,
      scene: 105,
      then: 106,
      my: 107,
      could: 108,
      being: 109,
      man: 110,
      best: 111,
      "doesn't": 112,
      these: 113,
      scenes: 114,
      new: 115,
      many: 116,
      "don't": 117,
      were: 118,
      such: 119,
      movies: 120,
      action: 121,
      know: 122,
      director: 123,
      "he's": 124,
      go: 125,
      through: 126,
      love: 127,
      here: 128,
      another: 129,
      great: 130,
      big: 131,
      us: 132,
      made: 133,
      back: 134,
      still: 135,
      end: 136,
      seems: 137,
      "there's": 138,
      work: 139,
      something: 140,
      those: 141,
      world: 142,
      now: 143,
      however: 144,
      makes: 145,
      down: 146,
      between: 147,
      real: 148,
      every: 149,
      though: 150,
      before: 151,
      better: 152,
      few: 153,
      take: 154,
      same: 155,
      both: 156,
      going: 157,
      performance: 158,
      seen: 159,
      should: 160,
      enough: 161,
      around: 162,
      role: 163,
      audience: 164,
      funny: 165,
      your: 166,
      why: 167,
      look: 168,
      "isn't": 169,
      think: 170,
      almost: 171,
      old: 172,
      long: 173,
      gets: 174,
      actually: 175,
      things: 176,
      years: 177,
      although: 178,
      comedy: 179,
      last: 180,
      nothing: 181,
      right: 182,
      thing: 183,
      may: 184,
      own: 185,
      played: 186,
      fact: 187,
      "that's": 188,
      ever: 189,
      script: 190,
      say: 191,
      plays: 192,
      come: 193,
      find: 194,
      comes: 195,
      cast: 196,
      year: 197,
      did: 198,
      john: 199,
      since: 200,
      part: 201,
      star: 202,
      young: 203,
      screen: 204,
      acting: 205,
      actors: 206,
      without: 207,
      original: 208,
      show: 209,
      again: 210,
      point: 211,
      least: 212,
      three: 213,
      guy: 214,
      lot: 215,
      takes: 216,
      quite: 217,
      course: 218,
      each: 219,
      far: 220,
      day: 221,
      away: 222,
      interesting: 223,
      family: 224,
      "i'm": 225,
      "can't": 226,
      once: 227,
      effects: 228,
      rather: 229,
      minutes: 230,
      goes: 231,
      might: 232,
      must: 233,
      making: 234,
      watch: 235,
      hard: 236,
      himself: 237,
      place: 238,
      during: 239,
      anything: 240,
      our: 241,
      always: 242,
      high: 243,
      times: 244,
      set: 245,
      fun: 246,
      yet: 247,
      "film's": 248,
      sense: 249,
      kind: 250,
      bit: 251,
      special: 252,
      instead: 253,
      trying: 254,
      want: 255,
      "didn't": 256,
      hollywood: 257,
      job: 258,
      picture: 259,
      seem: 260,
      wife: 261,
      give: 262,
      help: 263,
      together: 264,
      half: 265,
      along: 266,
      probably: 267,
      money: 268,
      pretty: 269,
      american: 270,
      actor: 271,
      home: 272,
      sure: 273,
      dialogue: 274,
      everything: 275,
      becomes: 276,
      series: 277,
      woman: 278,
      become: 279,
      having: 280,
      black: 281,
      gives: 282,
      given: 283,
      men: 284,
      watching: 285,
      whole: 286,
      got: 287,
      feel: 288,
      wants: 289,
      everyone: 290,
      looking: 291,
      done: 292,
      death: 293,
      father: 294,
      "10": 295,
      music: 296,
      less: 297,
      sex: 298,
      perhaps: 299,
      especially: 300,
      mind: 301,
      next: 302,
      moments: 303,
      "they're": 304,
      line: 305,
      looks: 306,
      completely: 307,
      night: 308,
      city: 309,
      girl: 310,
      rest: 311,
      reason: 312,
      play: 313,
      simply: 314,
      whose: 315,
      horror: 316,
      performances: 317,
      case: 318,
      different: 319,
      dead: 320,
      small: 321,
      second: 322,
      michael: 323,
      couple: 324,
      put: 325,
      evil: 326,
      lost: 327,
      until: 328,
      several: 329,
      "2": 330,
      james: 331,
      mother: 332,
      itself: 333,
      "she's": 334,
      entire: 335,
      ending: 336,
      "i've": 337,
      turns: 338,
      humor: 339,
      written: 340,
      getting: 341,
      begins: 342,
      shows: 343,
      comic: 344,
      left: 345,
      wrong: 346,
      thought: 347,
      human: 348,
      later: 349,
      head: 350,
      main: 351,
      friends: 352,
      town: 353,
      name: 354,
      called: 355,
      soon: 356,
      stars: 357,
      anyone: 358,
      idea: 359,
      someone: 360,
      use: 361,
      problem: 362,
      keep: 363,
      house: 364,
      school: 365,
      friend: 366,
      often: 367,
      turn: 368,
      hour: 369,
      found: 370,
      sequence: 371,
      group: 372,
      top: 373,
      despite: 374,
      hand: 375,
      either: 376,
      true: 377,
      full: 378,
      unfortunately: 379,
      boy: 380,
      s: 381,
      believe: 382,
      named: 383,
      playing: 384,
      against: 385,
      said: 386,
      tries: 387,
      david: 388,
      based: 389,
      else: 390,
      war: 391,
      under: 392,
      doing: 393,
      nice: 394,
      certainly: 395,
      moment: 396,
      live: 397,
      finally: 398,
      used: 399,
      camera: 400,
      tell: 401,
      face: 402,
      final: 403,
      works: 404,
      relationship: 405,
      run: 406,
      able: 407,
      directed: 408,
      mr: 409,
      video: 410,
      lives: 411,
      supposed: 412,
      "you're": 413,
      alien: 414,
      style: 415,
      side: 416,
      behind: 417,
      worst: 418,
      start: 419,
      days: 420,
      need: 421,
      summer: 422,
      person: 423,
      shot: 424,
      maybe: 425,
      perfect: 426,
      lines: 427,
      care: 428,
      self: 429,
      starts: 430,
      finds: 431,
      past: 432,
      entertaining: 433,
      worth: 434,
      book: 435,
      son: 436,
      kids: 437,
      tv: 438,
      seeing: 439,
      car: 440,
      early: 441,
      including: 442,
      short: 443,
      running: 444,
      game: 445,
      matter: 446,
      dark: 447,
      opening: 448,
      "wasn't": 449,
      major: 450,
      upon: 451,
      try: 452,
      beautiful: 453,
      nearly: 454,
      robert: 455,
      close: 456,
      fine: 457,
      let: 458,
      kevin: 459,
      fight: 460,
      throughout: 461,
      violence: 462,
      order: 463,
      production: 464,
      white: 465,
      problems: 466,
      already: 467,
      drama: 468,
      earth: 469,
      daughter: 470,
      team: 471,
      act: 472,
      boring: 473,
      children: 474,
      known: 475,
      review: 476,
      knows: 477,
      "who's": 478,
      jack: 479,
      example: 480,
      eyes: 481,
      supporting: 482,
      jokes: 483,
      version: 484,
      writer: 485,
      direction: 486,
      hit: 487,
      others: 488,
      deep: 489,
      roles: 490,
      title: 491,
      heart: 492,
      exactly: 493,
      sort: 494,
      sequences: 495,
      body: 496,
      fiction: 497,
      genre: 498,
      women: 499,
      computer: 500
    };
  }

  getSentimentFromTensor(text) {
    var sentiment = nGram.buildNGrams(text.text, 1);
    this.setState({
      tensor_sentiment: sentiment
    });

    var curr = null;
    var word_counts = new Array(500);

    for (var i = 0; i < 500; i++) {
      word_counts[i] = 0;
    }

    for (curr in sentiment) {
      if (curr in this.word_index) {
        word_counts[this.word_index[curr]] += sentiment[curr];
      }
    }

    this.setState({
      word_counts
    });
    console.log(word_counts);

    return sentiment;
  }

  validateForm() {
    return this.state.sentimentText.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSentimentSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });
    var res = "";

    try {
      res = await this.getSentimentFromTensor({
        text: this.state.sentimentText
      });

      console.log(res);

      // console.log("Getting file");
      // var filename = "model.json";
      // fileContents = await s3Download(filename);
      // console.log(fileContents);

      console.log("loading model");
      const model = await tf.loadModel(
        "https://s3.amazonaws.com/groups-app-upload/public/model.json"
      );

      console.log(model);

      var currentTensor = tf.tensor2d([this.state.word_counts], [1, 500]);
      currentTensor.print();

      var prediction = await model.predict(currentTensor).data();
      console.log(prediction[0]);

      var currentPrediction = prediction[0] * 100;
      var alertStyle = "warning";
      var review = "NEUTRAL";

      if (currentPrediction > 55) {
        review = "POSITIVE";
        alertStyle = "success";
      } else if (currentPrediction < 45) {
        review = "NEGATIVE";
        alertStyle = "danger";
      }
      this.setState({
        review,
        currentPrediction,
        alertStyle
      });

      this.setState({ isLoading: false });
    } catch (e) {
      alert(e);
      console.log(e);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSentimentSubmit}>
        <FormGroup controlId="sentimentText">
          <ControlLabel>Check Sentiment</ControlLabel>
          <FormControl
            placeholder="Enter any text here"
            onChange={this.handleChange}
            value={this.state.sentimentText}
            componentClass="textarea"
          />
        </FormGroup>
        <FormGroup>
          {this.state.tensor_sentiment && this.state.isLoading === false ? (
            <Alert
              bsStyle={
                this.state.alertStyle ? this.state.alertStyle : "success"
              }
            >
              <h4>{this.state.review} Review</h4>
              <p>Positivity Score: {this.state.currentPrediction} / 100</p>
              <p>{JSON.stringify(this.state.tensor_sentiment)}</p>
              <p>{this.state.word_counts}</p>
            </Alert>
          ) : (
            <div />
          )}
        </FormGroup>
        <LoaderButton
          block
          bsStyle="primary"
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Detect Sentiment"
          loadingText="Detecting…"
        />
      </form>
    );
  }
}

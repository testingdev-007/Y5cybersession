// ============================================================
// CHAT-DATA.JS — CyberShield Academy v7
// Age 9 — simple words, fun tone, 4-part structured module load
// ============================================================

const PERSONAS = {
  zara:   { id:'zara',   name:'Zara K.',   role:'Lead Detective' },
  marcus: { id:'marcus', name:'Marcus T.',  role:'Network Watcher' },
  priya:  { id:'priya',  name:'Priya S.',   role:'Threat Spotter' },
};

// ── GENERAL ───────────────────────────────────────────────────
const GENERAL_GROUP_CHAT = {
  welcome: [
    { persona:'zara',   msgs:["Hi! Welcome to CyberShield! We stop cyber attacks together. Click the green button above to get your first mission!","Hey there! I'm Zara. I'm going to help you stop the hackers! Hit the green button when you're ready.","Welcome! You're now a cyber detective. Click the big green button above to start!"] },
    { persona:'marcus', msgs:["Yooo! New detective on the team! Let's gooo 🚀","Hey! I'm Marcus. I look after the network. Ready to catch some hackers?","Woooo! Great timing — things have been quiet. (It never stays that way!) 😄"] },
    { persona:'priya',  msgs:["Welcome. I'm watching for threats. Click the button and let's get started.","Hi! I spot the dodgy stuff. You make the calls. Let's go!","Hi! Glad you're here. Hit the button when you're ready!"] },
  ],
  idle: [
    { persona:'marcus', msgs:["All quiet for now... probably! 😅","Network looks fine. Enjoy it while it lasts!","Did you know the first computer bug was an actual real moth in 1947?! 🦗","All green on my screen. Nice and calm!"] },
    { persona:'zara',   msgs:["Take your time — no rush!","Always here if you need help!","In this job, being careful is more important than being fast."] },
    { persona:'priya',  msgs:["No threats right now. Stay sharp!","Quiet for now. Use the time to think about what you've learned.","Hackers love when people relax and stop paying attention..."] },
  ],
};

// ── MODULE CHAT ────────────────────────────────────────────────
// Each module has 4 parts fired in order, 5 seconds apart:
//   onLoad_ask    — what's the mission
//   onLoad_start  — where to start (explicit instruction)
//   onLoad_attack — what this cyber attack actually is
//   onLoad_analogy — real-world analogy for a 9-year-old

const MODULE_GROUP_CHAT = {

  // ── DDoS ──────────────────────────────────────────────────────
  ddos: {
    onLoad_ask:[
      {persona:'marcus', msgs:["🚨 Alert! Our website is getting slammed with traffic. Something doesn't feel right — we need to check if it's an attack!","Big problem! Our network is getting flooded. Can you investigate?"]},
    ],
    onLoad_start:[
      {persona:'zara', msgs:["First — click your email on the left and read it. Then pick the Network Traffic Monitor tool and click LOAD TOOL. 👆","Step one: open your email. Step two: load the Network Traffic Monitor. Let's go!"]},
    ],
    onLoad_attack:[
      {persona:'priya', msgs:["A DDoS attack is when hackers send thousands and thousands of fake visitors to a website all at once. The website gets so busy it breaks and nobody can use it.","DDoS stands for Distributed Denial of Service. Hackers use loads of other computers to flood our website with requests until it crashes."]},
    ],
    onLoad_analogy:[
      {persona:'marcus', msgs:["Imagine 1,000 pizzas all arriving at your house at the same time — and you didn't order any of them! The delivery drivers block your road and nobody can get in. That's a DDoS! 🍕🍕🍕","Think of it like everyone in your school trying to squeeze through one door at exactly the same time. The door can't cope and gets jammed!"]},
    ],
    onToolCorrect:[
      {persona:'zara',   msgs:["Network Traffic Monitor — spot on! Now check each service. Is the traffic normal or way too high?"]},
      {persona:'marcus', msgs:["Yes! Right tool! Now let's look at the numbers. Way more than normal = suspicious!"]},
    ],
    onToolWrong:[
      {persona:'zara',   msgs:["Not quite! We need to see the traffic numbers. Which tool monitors traffic?"]},
      {persona:'marcus', msgs:["Oops! Think about what we need to look at — how busy is the network? Which tool shows that?"]},
    ],
    onActionCorrect:[
      {persona:'marcus', msgs:["Nailed it! ✅ That's exactly the right thing to do!"]},
      {persona:'zara',   msgs:["Perfect! Well spotted and well handled!"]},
    ],
    onActionWrong:[
      {persona:'zara',   msgs:["Not quite — look at how much higher the traffic is compared to normal. That's the key clue!"]},
      {persona:'marcus', msgs:["Think traffic lights: Red = way too much = block it, Amber = a bit high = slow it down, Green = normal = leave it!"]},
    ],
    onAllHandled:[
      {persona:'marcus', msgs:["All done! Now choose who to send the report to. Who looks after the network?"]},
      {persona:'zara',   msgs:["Great work! Last step — pick the right team to tell. Think about who manages the network!"]},
    ],
    onReportCorrect:[
      {persona:'zara',   msgs:["The Network Operations Centre — exactly right! They'll block the attack. Brilliant! 🏆"]},
      {persona:'marcus', msgs:["Yes! The NOC will sort it out. You're a legend!"]},
    ],
    onReportWrong:[
      {persona:'priya',  msgs:["Wrong team! Think about who looks after the network... which team does that?"]},
    ],
    onScenarioComplete:[
      {persona:'marcus', msgs:["DDoS stopped! Amazing work! 🎉"]},
    ],
  },

  // ── MALWARE ───────────────────────────────────────────────────
  malware:{
    onLoad_ask:[
      {persona:'zara', msgs:["🚨 Something weird is running on one of our computers! There are strange programs showing up that shouldn't be there.","Alert! A computer is behaving strangely — there might be bad software hiding on it. We need to check!"]},
    ],
    onLoad_start:[
      {persona:'marcus', msgs:["Open your email first, then pick the Process Monitor tool and click LOAD TOOL. That'll show us what programs are running!","Click your email, read what's happened, then load the Process Monitor. Let's find the bad guys!"]},
    ],
    onLoad_attack:[
      {persona:'priya', msgs:["Malware is a bad program that secretly gets onto your computer. It can steal information, slow your computer down, or spy on what you're doing.","'Malware' is short for 'malicious software'. It's software that someone put on your computer to cause harm — without you knowing!"]},
    ],
    onLoad_analogy:[
      {persona:'zara', msgs:["Imagine a spy wearing a school uniform to sneak into your school. They look like they belong there, but they're actually stealing secrets. That's what malware does — it hides on your computer pretending to be normal!","It's like a wolf in sheep's clothing. The bad program wears a disguise to look like something you'd trust."]},
    ],
    onToolCorrect:[
      {persona:'zara',   msgs:["Process Monitor — perfect! Look at each program's name. Weird names or super high CPU are your clues!"]},
      {persona:'marcus', msgs:["That's the one! If a program has a weird name AND is hogging the CPU — that's malware!"]},
    ],
    onToolWrong:[
      {persona:'marcus', msgs:["Not that one! We need to see what programs are running. Which tool shows that?"]},
      {persona:'zara',   msgs:["Think about what we're looking for — programs running on the computer. Which tool shows those?"]},
    ],
    onActionCorrect:[
      {persona:'marcus', msgs:["Right call! ✅ That program is dealt with!"]},
      {persona:'zara',   msgs:["Perfect! That's exactly how you handle it!"]},
    ],
    onActionWrong:[
      {persona:'priya',  msgs:["Think about it — a strange program with a weird name using loads of CPU. That needs to be quarantined, not ignored!"]},
      {persona:'zara',   msgs:["Unknown program + high CPU = not safe! What's the safest action to take?"]},
    ],
    onAllHandled:[
      {persona:'zara',   msgs:["All sorted! Now report it. Which team deals with security problems?"]},
    ],
    onReportCorrect:[
      {persona:'marcus', msgs:["Incident Response — yes! They'll clean up the infected computer. Amazing work!"]},
    ],
    onReportWrong:[
      {persona:'priya',  msgs:["Wrong team. Malware is a security incident — which team handles those?"]},
    ],
    onScenarioComplete:[
      {persona:'zara',   msgs:["Malware found and sorted! Excellent detective work! 🔍"]},
    ],
  },

  // ── RANSOMWARE ────────────────────────────────────────────────
  ransomware:{
    onLoad_ask:[
      {persona:'priya', msgs:["🚨 Emergency! Files on our computer drives are being locked up! Someone might be using ransomware on us!","RED ALERT! File drives are showing something really worrying — files getting encrypted. We need to act fast!"]},
    ],
    onLoad_start:[
      {persona:'zara', msgs:["Click your email, read the alert, then load the File System Monitor tool. Quick — every second counts with ransomware!","Open your email first, then choose File System Monitor from the dropdown and hit LOAD TOOL!"]},
    ],
    onLoad_attack:[
      {persona:'marcus', msgs:["Ransomware is a type of bad software that locks all your files so you can't open them. Then the hackers demand money to give you the key. If you don't pay — you might lose everything!","Ransomware 'encrypts' your files — that means it scrambles them so they're unreadable. Then the attacker says 'pay us money and we'll unscramble them!'"]},
    ],
    onLoad_analogy:[
      {persona:'priya', msgs:["Imagine coming home and finding a padlock on your bedroom door. There's a note: 'Pay us £500 or you can never get back inside.' That's exactly what ransomware does — but with your files on a computer! 🔒","Think of it like someone taking all your homework and locking it in a safe. They say 'give me all your pocket money or you'll never see it again!'"]},
    ],
    onToolCorrect:[
      {persona:'zara',   msgs:["File System Monitor — right! Check each drive. Are files being encrypted? How fast?"]},
      {persona:'marcus', msgs:["That's it! Now look — if files are being locked up quickly, that's really bad!"]},
    ],
    onToolWrong:[
      {persona:'zara',   msgs:["Not that one — we need to look at the files on our drives. Which tool monitors file systems?"]},
      {persona:'marcus', msgs:["Think about what we need to see — what's happening to the files. Which tool shows that?"]},
    ],
    onActionCorrect:[
      {persona:'marcus', msgs:["Yes! Perfect action! ✅"]},
      {persona:'priya',  msgs:["Correct! That stops the spread. Well done!"]},
    ],
    onActionWrong:[
      {persona:'priya',  msgs:["Think again — if files are being locked up quickly, what's the most important thing to do?"]},
      {persona:'zara',   msgs:["Red = lots of files encrypted = isolate the drive immediately! We can't let it spread!"]},
    ],
    onAllHandled:[
      {persona:'zara',   msgs:["All drives assessed! Now tell the right team — who handles cyber emergencies?"]},
    ],
    onReportCorrect:[
      {persona:'marcus', msgs:["Incident Response team — spot on! They'll isolate the computers and start recovery. Hero! 🦸"]},
    ],
    onReportWrong:[
      {persona:'priya',  msgs:["Wrong team. Ransomware is a major emergency — which team responds to attacks?"]},
    ],
    onScenarioComplete:[
      {persona:'zara',   msgs:["Ransomware contained! Really impressive work! 🌟"]},
    ],
  },

  // ── PHISHING IDENTIFIER ───────────────────────────────────────
  phishingModule:{
    onLoad_ask:[
      {persona:'zara', msgs:["🚨 We've got a batch of suspicious emails. Some are real, some are fakes trying to trick people. Can you spot the fakes?","Alert! Some emails came in and we're not sure if they're real or fake. Help us sort the good ones from the bad ones!"]},
    ],
    onLoad_start:[
      {persona:'priya', msgs:["Read your email, then load the Email Header Analyser. You'll see a list of emails — spot the fake ones and report them!","Open your email first, then pick the Email Header Analyser. Look at each email address really carefully!"]},
    ],
    onLoad_attack:[
      {persona:'marcus', msgs:["Phishing is when someone sends a fake email pretending to be a real company — like your bank or Amazon. They're trying to trick you into clicking a bad link or giving away your password!","A phishing email looks real but it's fake. The clue is usually in the email address — it'll have a tiny spelling mistake or a weird domain name."]},
    ],
    onLoad_analogy:[
      {persona:'zara', msgs:["Imagine getting a letter that looks like it's from your school, but someone pretending made it. They're hoping you'll give them your locker combination! That's phishing — fake messages trying to steal your info. 🎣","It's like a fishing hook with fake bait on it. The hackers dangle a convincing-looking email and hope you 'bite' and click the link!"]},
    ],
    onToolCorrect:[
      {persona:'zara',   msgs:["Email Header Analyser — perfect! Now look at each email address very carefully. Even one wrong letter is a red flag!"]},
      {persona:'priya',  msgs:["Great choice! Check the 'From' address on each one. Hackers often swap letters for numbers — like 0 for O!"]},
    ],
    onToolWrong:[
      {persona:'zara',   msgs:["Not that one — we need to look at email addresses. Which tool does that?"]},
      {persona:'priya',  msgs:["Think about what we're investigating — email addresses. Which tool analyses those?"]},
    ],
    onActionCorrect:[
      {persona:'marcus', msgs:["Correct! ✅ Great spotting!"]},
      {persona:'zara',   msgs:["Well done! You've got a sharp eye!"]},
    ],
    onActionWrong:[
      {persona:'priya',  msgs:["Look again at the email address. Is every letter exactly right? Even tiny differences are a big clue!"]},
      {persona:'zara',   msgs:["Check the domain name very carefully. A real company uses their proper address — fakes have small mistakes!"]},
    ],
    onAllHandled:[
      {persona:'zara',   msgs:["All emails checked! Now report to the right team — who handles email security?"]},
    ],
    onReportCorrect:[
      {persona:'priya',  msgs:["IT Security team — exactly right! They'll block those fake addresses. Brilliant! 🏆"]},
    ],
    onReportWrong:[
      {persona:'zara',   msgs:["Wrong team. Email phishing is a security issue — which team handles that?"]},
    ],
    onScenarioComplete:[
      {persona:'marcus', msgs:["All fakes identified! You're going to be an amazing detective! 🕵️"]},
    ],
  },

};

// ── PHISHING EXCEPTION CHAT ────────────────────────────────────
const PHISHING_EXCEPTION_CHAT = {
  onPhishingArrived:[
    {persona:'priya', msgs:["⚠️ Hold on — look very carefully at that email sender before you click anything!"]},
    {persona:'zara',  msgs:["Wait! Check who sent that email. Does the address look exactly right?"]},
  ],
  onOpened:[
    {persona:'zara',  msgs:["Oh no — that was a fake email! Always check the sender address first. Don't worry, we learn from our mistakes! 💪"]},
    {persona:'marcus',msgs:["Uh oh! That one was a phishing email in disguise. Check those addresses carefully next time!"]},
  ],
  onReported:[
    {persona:'priya', msgs:["Yes! Amazing spotting — you caught the fake email! ⭐"]},
    {persona:'zara',  msgs:["Brilliant! You spotted the fake address and reported it. That's exactly right!"]},
  ],
};

// ── IP TRACE CHAT ──────────────────────────────────────────────
const IP_TRACE_CHAT = {
  onWin:[
    {persona:'marcus', msgs:["YES! You tracked the hacker across the whole map! Incredible! 🌍🔒"]},
    {persona:'priya',  msgs:["Every IP confirmed and the hacker is locked out! Outstanding! 🏆"]},
  ],
  onLose:[
    {persona:'zara',   msgs:["So close! Watch the map really carefully — each city has its own IP address. You've got this!"]},
    {persona:'marcus', msgs:["Nearly got them! Keep your eyes on the IP display panel — it shows the right number!"]},
  ],
};

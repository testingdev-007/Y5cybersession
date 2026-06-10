// ============================================================
// SPEECH.JS — CyberShield Academy Text-to-Speech
// Uses Web Speech API (SpeechSynthesis) — built into modern
// browsers, no external files or services required.
// Fails silently if unsupported or unavailable.
// SmartChat is intentionally excluded.
// ============================================================

const VOX = (() => {

  // ── State ────────────────────────────────────────────────
  let enabled  = true;
  let ready    = false;
  let allVoices = [];

  // Per-persona voice profile — applied by best-match search
  // pitch: 0.5–2.0  rate: 0.7–1.4
  const PROFILES = {
    zara:    { pitch: 1.15, rate: 0.92, prefLang: 'en-GB', prefName: ['Serena','Samantha','Google UK English Female','Microsoft Hazel','Alice','Karen'] },
    marcus:  { pitch: 0.88, rate: 1.08, prefLang: 'en-GB', prefName: ['Daniel','Google UK English Male','Microsoft George','Microsoft David','Alex'] },
    priya:   { pitch: 1.28, rate: 0.98, prefLang: 'en-IN', prefName: ['Veena','Rishi','Neerja','Google हिन्दी','Microsoft Heera','Samantha'] },
    narrator:{ pitch: 1.00, rate: 1.00, prefLang: 'en-US', prefName: ['Google US English','Samantha','Microsoft David','Alex'] },
  };

  // Resolved voice cache
  const voiceCache = {};

  // ── Initialise ───────────────────────────────────────────
  function init() {
    if (!window.speechSynthesis) return;
    function load() {
      allVoices = window.speechSynthesis.getVoices();
      if (allVoices.length > 0) ready = true;
    }
    load();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = load;
    }
    // Fallback: try again after a short delay
    setTimeout(load, 500);
  }

  // ── Voice resolver ────────────────────────────────────────
  function resolveVoice(personaId) {
    if (voiceCache[personaId]) return voiceCache[personaId];
    if (!allVoices.length) return null;
    const prof = PROFILES[personaId] || PROFILES.narrator;

    // 1. Try preferred names (partial match, case-insensitive)
    for (const name of prof.prefName) {
      const v = allVoices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
      if (v) { voiceCache[personaId] = v; return v; }
    }
    // 2. Try preferred language
    const byLang = allVoices.find(v => v.lang.startsWith(prof.prefLang));
    if (byLang) { voiceCache[personaId] = byLang; return byLang; }
    // 3. Any English voice
    const anyEn = allVoices.find(v => v.lang.startsWith('en'));
    if (anyEn) { voiceCache[personaId] = anyEn; return anyEn; }
    // 4. Whatever is first
    voiceCache[personaId] = allVoices[0] || null;
    return voiceCache[personaId];
  }

  // ── Core speak ────────────────────────────────────────────
  function speak(text, personaId = 'narrator', priority = false) {
    try {
      if (!enabled) return;
      if (!window.speechSynthesis) return;
      if (!ready) {
        allVoices = window.speechSynthesis.getVoices();
        ready = allVoices.length > 0;
        if (!ready) return;
      }

      // Strip any HTML tags and emoji from text
      const clean = text
        .replace(/<[^>]+>/g, '')
        .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
        .replace(/[✓✗⚠🔴🟡🟢📋👆📧🔬📊]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (!clean) return;

      const utter = new SpeechSynthesisUtterance(clean);
      const prof  = PROFILES[personaId] || PROFILES.narrator;
      const voice = resolveVoice(personaId);
      if (voice) utter.voice = voice;
      utter.pitch  = prof.pitch;
      utter.rate   = prof.rate;
      utter.volume = 0.9;

      // Priority utterances cancel current speech
      if (priority) window.speechSynthesis.cancel();

      window.speechSynthesis.speak(utter);
    } catch (e) {
      // Fail silently — speech is an enhancement, not critical
    }
  }

  // ── Cancel all pending speech ─────────────────────────────
  function cancel() {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch(e) {}
  }

  // ── Public API ────────────────────────────────────────────
  return {
    init,
    cancel,

    // Toggle on/off — called by the toolbar button
    toggle() {
      enabled = !enabled;
      if (!enabled) cancel();
      return enabled;
    },
    isEnabled() { return enabled; },

    // Speak a group chat message in that persona's voice
    chat(personaId, text) { speak(text, personaId); },

    // Narrated game events
    narrate(text, priority=false) { speak(text, 'narrator', priority); },

    // Specific game moment phrases — varied so they don't repeat
    correct() {
      const lines = [
        'Correct! Well done.',
        'That\'s right! Nice work.',
        'Correct answer. Good thinking.',
        'Exactly right. Keep it up.',
        'Spot on!',
      ];
      speak(pick(lines), 'narrator', true);
    },

    wrong() {
      const lines = [
        'Not quite. Have another look.',
        'That\'s not right. Try again.',
        'Incorrect. Check the data carefully.',
        'Wrong answer. Think about what the numbers are telling you.',
      ];
      speak(pick(lines), 'narrator', true);
    },

    newEmail() {
      speak(pick([
        'New email in your inbox.',
        'You have a new message.',
        'Incoming email. Check your inbox.',
        'Email received. Take a look before you act.',
      ]), 'narrator');
    },

    phishingWarning() {
      speak('Careful. Check that sender address very carefully before you do anything.', 'narrator', true);
    },

    toolCorrect() {
      speak(pick([
        'Correct tool loaded. Review the data.',
        'That\'s the right tool. Now check the results.',
        'Good choice. The data is loading.',
      ]), 'narrator', true);
    },

    toolWrong() {
      speak(pick([
        'That\'s not the right tool. Think about what type of attack this is.',
        'Wrong tool. Have another look at your options.',
        'Not quite. Which tool would help you investigate this type of problem?',
      ]), 'narrator', true);
    },

    reportCorrect() {
      speak(pick([
        'Correct team. Report filed.',
        'Right team selected. Well done.',
        'Report submitted to the correct team.',
      ]), 'narrator', true);
    },

    reportWrong() {
      speak('Wrong team. Think about which team handles this type of incident.', 'narrator', true);
    },

    // IP trace specific
    ipAlert() {
      speak('Warning! Intrusion detected. Prepare to trace the hacker.', 'narrator', true);
    },

    ipCountdown(n) {
      speak(String(n), 'narrator', true);
    },

    ipHop(city, country) {
      speak('Hop detected. ' + city + ', ' + country + '. Identify the IP address.', 'narrator', true);
    },

    ipFinal(city, country) {
      speak('Source located. ' + city + ', ' + country + '. Lock them down now!', 'narrator', true);
    },

    ipCorrectHop() {
      speak(pick(['Correct!', 'Right!', 'Confirmed.']), 'narrator', true);
    },

    ipWin() {
      speak('Hacker locked out. Machine isolated. Outstanding work, Agent.', 'narrator', true);
    },

    ipLose(reason) {
      speak('Trace failed. ' + (reason || 'The hacker escaped.'), 'narrator', true);
    },

    scenarioComplete() {
      speak(pick([
        'Scenario complete. Good work.',
        'Mission accomplished. Well done.',
        'All items handled. Scenario finished.',
      ]), 'narrator');
    },

    sessionComplete() {
      speak('Session complete. Check your results, Agent.', 'narrator', true);
    },
  };
})();

// Initialise once the page loads
document.addEventListener('DOMContentLoaded', () => { try { VOX.init(); } catch(e) {} });

====================================================
ZERO-GAP VOTING ARCHITECTURE
A Formal Technical Proposal for the Modernization
of the Indian Electronic Voting System

Open Source Proposal — This document is released as a
public blueprint. Anyone may freely use, adapt, or
improve upon the ideas presented herein.

Proposed by: Roshan Kr Singh
Contact: roshofficialmail@icloud.com
Submitted to: Election Commission of India, UIDAI, MeitY
Date: April 2026
====================================================

ABSTRACT

India conducts the largest democratic election on Earth,
mobilizing over 960 million eligible voters across one
of the most geographically and socially diverse nations
in the world. Despite decades of successful EVM
deployment, persistent public skepticism about the
possibility of electronic tampering — alongside documented
challenges including multiple voting, booth-capturing,
and the theoretical vulnerability of connected systems —
continues to undermine voter confidence.

This proposal introduces the Zero-Gap Voting
Architecture, a next-generation, dual-node election
system engineered to make electronic tampering not
merely difficult, but mathematically and physically
impossible. By severing the connection between identity
validation and ballot casting through an optical airgap,
anchoring all vote records in immutable cryptographic
ledgers, and backing every digital action with an
immediate physical paper trail, this system eliminates
the attack surface that critics and adversaries
currently target.

The architecture does not propose discarding India's
existing EVM investment. It proposes a targeted, layered
upgrade that builds on proven hardware philosophy while
closing every known interference gap.

====================================================
SECTION 1 — HOW VOTES ARE CAST
====================================================

1. THE PROBLEM: WHY THE CURRENT SYSTEM HAS GAPS

1.1 The Monolithic Machine Problem

The current EVM is a single, monolithic device. It
handles identity validation, ballot casting, and vote
storage within one physical unit. This "all-in-one"
design creates a single point of failure: a compromised
machine compromises all three functions simultaneously.

1.2 The Signal Interception Problem

In most proposed hybrid systems, the online validation
terminal sends a digital signal — green or red — to the
ballot machine over a wire or short-range wireless
connection. This is a man-in-the-middle attack vector.
A bad actor with physical access to the polling booth
can intercept or replay that signal, unlocking the EVM
for an unauthorized voter without touching either
machine's core software.

1.3 The Memory Tampering Problem

After voting concludes, the EVM's internal memory stores
which voter IDs have been marked as "already voted." If
this memory block uses a flat, unprotected write
structure, a technically skilled actor who gains
physical possession of the machine — during transport
or storage — can overwrite those records, erasing the
voting history and theoretically allowing the machine
to be reused fraudulently.

1.4 The GUI Black Box Problem

Replacing the traditional button-based EVM with a
modern touchscreen GUI introduces a "black box" problem:
a voter taps Candidate A on the screen, but there is no
way to independently verify that the underlying software
registered the same input. The physical button-to-
microcontroller connection was simple to audit; a GUI
running on an operating system is not.

1.5 The Multiple Voting Problem

Without a real-time, tamper-proof ledger, preventing
the same voter from casting multiple ballots across
different booths — or different constituencies — remains
a logistical challenge dependent on paper records and
human vigilance.

====================================================
2. THE PROPOSED SOLUTION: ZERO-GAP ARCHITECTURE

The Zero-Gap Architecture addresses each problem above
through a strictly segregated, dual-node system where
no electronic signal of any kind passes between the
identity validation stage and the ballot casting stage.

The only information that crosses the gap is a
time-sensitive, cryptographically signed optical token —
a QR code — that is verified, consumed, and destroyed
in a single use.

====================================================
3. CORE NODE SPECIFICATIONS

3.1 Node A — The Online Identity Terminal

Node A is the voter's first point of contact. It is
operated exclusively by an authorized election official
and is the only component of the entire system connected
to any external network.

Hardware Specifications:
  - Primary Biometric: High-resolution optical
    fingerprint scanner (ISO/IEC 19794-2 compliant)
  - Secondary Biometric (Fallback): Near-infrared iris
    scanner (ISO/IEC 19794-6 compliant) — activated
    automatically when fingerprint match confidence
    falls below threshold
  - Smart Card Reader: NFC/contact-based reader
    compatible with the proposed chipped Voter ID card
  - Display: Small, tamper-evident LCD screen — outputs
    only the QR code. No other function.
  - Network: Encrypted TLS 1.3 connection to the
    national voter authentication server (Aadhaar
    authentication API architecture)
  - QR Code: Time-stamped, cryptographically signed
    using RSA-4096 or Ed25519. Valid for 90 seconds
    only. Single-use. Non-replayable.

3.2 Node B — The Airgapped EVM with GUI

Node B is the ballot casting machine. It has zero
network capability — no Wi-Fi chip, no Bluetooth module,
no physical network port. Its only input is the optical
scanner that reads the QR code from Node A.

Hardware Specifications:
  - Display: 10-inch capacitive touchscreen — high-
    contrast candidate display (party logos prominently
    shown, accessible for low-literacy and elderly
    voters)
  - Scanner: Dedicated hardware QR code scanner
    (read-only optical sensor — no USB data port)
  - Primary Storage (Read-Only): PROM chip pre-flashed
    before election day with the authorized voter ID
    list for that specific constituency. Physically
    sealed. Cannot be written during operation.
  - Secondary Storage (Write Ledger): EEPROM module
    running a cryptographic hash chain ledger
  - VVPAT Printer: Integrated thermal printer behind
    a glass verification pane
  - Independent Watchdog Controller: Separate
    microcontroller wired at hardware level
  - Power: Battery-backed with sealed hardware power
    management — no external power dependency

====================================================
4. THE FOUR ZERO-GAP INTERFERENCE PROTOCOLS

4.1 Protocol One: The Optical Airgap
(Severing the Wire)

Problem it solves: Signal interception and
man-in-the-middle attacks.

There are no cables, no Wi-Fi, no Bluetooth, and no
radio frequency of any kind between Node A and Node B.
The only information that travels is light — photons
captured by Node B's optical scanner reading the QR
code on Node A's screen.

This is not a software security measure. It is a
physical law. An attacker cannot intercept a signal
that does not exist.

QR Code Cryptographic Payload:

  {
    "voter_id_hash":      SHA-256 of Voter ID number,
    "constituency_code":  Authorized booth identifier,
    "timestamp":          Unix timestamp (ms precision),
    "nonce":              Cryptographic random — single use,
    "signature":          RSA-4096 / Ed25519 signed by ECI
  }

Node B holds the corresponding public key burned into
its read-only firmware before election day. Signature
verification is a pure mathematical operation performed
entirely offline. The nonce ensures the same QR code
cannot be photographed and replayed for a second use.

4.2 Protocol Two: Cryptographic Hash Ledgers
(Immutable Memory)

Problem it solves: Physical memory tampering and
double-voting.

The EEPROM ledger is structured as a cryptographic hash
chain — the same mathematical principle underlying
blockchain technology, implemented at hardware level
in firmware-level C/C++.

Each entry structure:

  {
    "entry_id":        Sequential integer,
    "voter_id_hash":   SHA-256 of voter identity,
    "vote_hash":       SHA-256 of encrypted vote record,
    "timestamp":       Unix timestamp,
    "prev_hash":       SHA-256 of previous entry (chain link),
    "block_hash":      SHA-256 of all above fields combined
  }

If anyone alters a historical entry — even a single bit:

  - The hash of that entry changes
  - This breaks every subsequent hash in the chain
  - The machine detects the broken chain on next power-on
  - Machine locks permanently and alerts officials
  - Stealthy tampering is mathematically impossible

4.3 Protocol Three: Hardware Watchdog Timers
(Guaranteed State Recovery)

Problem it solves: Software crashes, GUI freezes, and
incomplete transaction vulnerabilities.

A Hardware Watchdog Timer (HWT) is a small, independent
microcontroller wired directly to the main board's
power rail. It operates on a separate clock and cannot
be disabled by the main software.

Operation cycle:

  - Main EVM software sends PING to HWT every 10ms
  - HWT expects PING within defined window
  - If PING stops (crash/freeze/hang):
      → HWT physically cuts power to main board
      → Purges all volatile RAM instantly
      → Forces cold reboot in under 30ms
      → Machine returns to locked idle state
  - Voter returns to Node A for a new QR code
  - No vote data corrupted. No incomplete transaction. Ever.

4.4 Protocol Four: VVPAT Black Box Resolution
(Physical Proof Layer)

Problem it solves: GUI trust problem and coercion
verification.

The process is strictly sequential and atomic:

  Step 1: Voter taps candidate logo on the GUI
  Step 2: Before any vote is committed to digital
          memory, the VVPAT printer activates
  Step 3: Paper slip printed — candidate name, party
          symbol, unique ballot reference code
  Step 4: Slip displayed behind glass for exactly
          5 seconds
  Step 5: Audio beep confirms visual acknowledgment
          window
  Step 6: Paper slip mechanically deposited into
          tamper-evident, locked physical ballot box
  Step 7: Only after physical paper is secured does
          software commit the vote to EEPROM hash chain

The paper is the legally binding ground truth.
The digital record is its mirror.

====================================================
5. VOTER ID SMART CARD INTEGRATION

Upgrade the current Voter ID (EPIC) card to a chipped
smart card. India's Aadhaar ecosystem and banking
system already deploy NFC/chip cards at massive scale.

Specifications:

  - Chip Type: EMV-compliant secure element (same as
    Indian bank cards)
  - Communication: ISO/IEC 14443 NFC (contactless) +
    ISO/IEC 7816 contact interface
  - Stored Data: Encrypted Voter ID hash, constituency
    code, enrolment biometric reference hash
  - What is NOT stored: Raw biometric data is never on
    the card — only the enrolment hash for local
    matching
  - Tamper Protection: Secure element self-destructs
    stored data if physically opened (industry standard)
  - Backward Compatibility: Card carries existing EPIC
    barcode for legacy system compatibility

The card reduces authentication time from 15–20 seconds
to under 5 seconds by allowing Node A to pre-fetch the
voter's enrolment record before biometric scan.

====================================================
6. SECURITY THREAT ANALYSIS

  Threat Vector           | Current EVM  | Zero-Gap Defence
  ------------------------+--------------+-------------------
  Remote network attack   | Possible if  | Node B has no
                          | networked    | radio hardware —
                                          physically
                                          incapable

  Signal interception     | Wire/wire-   | No signal exists —
                          | less can be  | optical QR + nonce
                          | replayed     | prevents replay

  Memory tampering        | Flat EEPROM  | Hash chain —
                          | can be       | alteration breaks
                          | overwritten  | chain, locks
                                          machine

  Multiple voting         | Paper ledger | Node A checks
                          | + human      | national DB;
                          | vigilance    | EEPROM hash chain
                                          on Node B

  Cross-constituency      | Manual       | Voter ID not in
  voting                  | boundary     | PROM chip =
                          | enforcement  | cryptographic
                                          rejection

  GUI vote manipulation   | Theoretical  | VVPAT prints
                          | OS           | before digital
                          | vulnerability| commit — paper is
                                          authority

  System crash mid-vote   | Ambiguous    | HWT purges RAM,
                          | incomplete   | cold reboots
                          | state        | in <30ms — no
                                          corrupt state

  Forged QR code          | N/A          | RSA-4096/Ed25519
                                          impossible to forge
                                          without ECI
                                          private key

  QR photograph/replay    | N/A          | Single-use nonce —
                                          second scan rejected
                                          at signature
                                          verification

  Physical machine theft  | Vote data    | Hash chain check
                          | accessible   | on boot — broken
                                          chain locks machine

====================================================
SECTION 2 — HOW VOTES ARE COUNTED
====================================================

1. OVERVIEW — THE TWO-STAGE SYSTEM

  Node A handles identity validation online.
  Node B handles ballot casting offline.
  Only connection: one-time optical QR code.
  No wire. No signal. No network.

====================================================
2. FULL VOTING DAY FLOW

  Step 1: Voter arrives → taps NFC Voter ID on Node A
  Step 2: Fingerprint scan → matches national database
  Step 3: Server confirms voter has not already voted
  Step 4: Node A generates signed QR code (90 sec timer)
  Step 5: Voter walks to Node B → scans QR optically
  Step 6: Ballot displayed → voter taps candidate
  Step 7: VVPAT prints paper slip → 5 sec view → box
  Step 8: Vote committed to hash chain → machine idles

====================================================
3. CRYPTOGRAPHIC HASH CHAIN — IMMUTABLE MEMORY

After every vote, the record is chained to all previous
votes using cryptographic hashing. Any alteration, even
a single bit, breaks the entire chain and permanently
locks the machine.

Why this matters: Current EVMs use a flat EEPROM ledger.
A skilled technician with physical access can overwrite
it. Zero-Gap's hash chain means overwriting one entry
changes its hash, breaking the next entry's hash,
cascading through the entire record — detectable
instantly on reboot.

====================================================
4. POST-ELECTION TRIPLE RECONCILIATION

When polls close, three independent tallies are
generated. All three must match before any result
is declared.

  Stream 1 — Node A Server Log:
    Source: National voter authentication database
    Counts: QR codes (validated voters) issued per booth
    = TOTAL A: Authenticated Voters

  Stream 2 — Node B EEPROM:
    Source: Hash chain ledger on the offline voting
            machine
    Counts: Votes digitally committed and recorded
    = TOTAL B: Digital Votes Cast

  Stream 3 — VVPAT Ballot Box:
    Source: Physical paper slips from sealed ballot box
    Counts: Paper ballots physically cast and deposited
    = TOTAL C: Physical Paper Votes

RECONCILIATION FORMULA:

  TOTAL A = TOTAL B = TOTAL C

  - If all three match:
      Result declared valid and published
  - If any two disagree:
      System logs identify exact layer of divergence
      → Targeted investigation triggered

====================================================
5. CURRENT SYSTEM VS ZERO-GAP COMPARISON

  Feature                 | Current System      | Zero-Gap
  ------------------------+---------------------+------------------
  Vote tally source       | CU EEPROM only      | EEPROM + VVPAT
                          | (single source)     | + Server log
                                                | (triple verified)

  VVPAT audit coverage    | ~5 random machines  | 100% of votes
                          | per segment         | have a physical
                                                | paper slip

  Tamper detection        | Seal inspection +   | Hash chain breaks
                          | manual checks       | automatically,
                                                | locks machine

  Cross-verification      | Partial, manual,    | Automatic 3-way
                          | time-consuming      | reconciliation
                                                | before result

  Recount capability      | Court order         | Full physical
                          | required, 45-day    | recount always
                          | timeline            | available

  Multiple voting defence | Paper ledger +      | Real-time DB
                          | human vigilance     | check + PROM
                                                | chip + hash
                                                | chain

====================================================
SECTION 3 — LEGAL, REGULATORY & PATHWAY
====================================================

1. PATHWAY OF IMPLEMENTATION

1.1 Existing Legal Basis — RPA 1951

Legal authority for EVMs: Sections 61A, 61B, and 61C
of the Representation of the People Act, 1951.

  - Section 61A: ECI authorized to use voting machines
  - Section 61B: Use with such modifications as ECI
    directs

Zero-Gap's dual-node system is a modification, not a
replacement. It is compatible with the existing Act's
scope subject to ECI notification.

1.2 Supreme Court Precedent — VVPAT Mandate

Subramanian Swamy vs ECI (2013): The Supreme Court
directed the ECI to introduce VVPAT with all EVMs.
This directly validates Zero-Gap's VVPAT integration.

2019 and 2023 hearings: The Court affirmed that
physical paper verification must accompany any digital
vote recording.

The Supreme Court has already established that a
physical paper trail is constitutionally required.
Zero-Gap fulfils this requirement more completely than
the current system does.

1.3 The Approval Pathway — Step by Step

  Step 1: ECI Technical Expert Committee (TEC) Review
  Step 2: Conduct of Elections Rules 1961 Amendment
          (Rules 49A and 49B)
  Step 3: Controlled Pilot under Section 58A authority
          (no parliamentary amendment needed)
  Step 4: Parliamentary Amendment to Section 61A
          (for national rollout)
  Step 5: UIDAI Integration Agreement for Node A
          biometric authentication

====================================================
2. COST & FEASIBILITY ESTIMATE

2.1 Hardware Cost Breakdown

  Node A (Authentication Terminal):
    Unit cost:  Rs. 30,000–40,000
    Quantity:   ~10.5 lakh booths
    Total:      Rs. 3,150–4,200 crore

  Node B (Upgraded EVM):
    Unit cost:  Rs. 35,000–50,000
    Quantity:   ~10.5 lakh booths
    Total:      Rs. 3,675–5,250 crore

  Voter ID Smart Card:
    Unit cost:  Rs. 75–100 per card
    Quantity:   ~95 crore voters
    Total:      Rs. 7,125–9,500 crore

  National Server Infrastructure:
    Total:      Rs. 500–1,500 crore

  Training, Logistics & Deployment:
    Total:      Rs. 300–700 crore

  TOTAL ONE-TIME INVESTMENT:
    Rs. 14,750–21,150 crore
    (approx. $1.8–2.6 billion USD)

2.2 Feasibility Context

  India's 2024 General Election total economic impact:
  over Rs. 1.2 lakh crore.

  Zero-Gap = one-time investment of 12–18% of one
  election's economic footprint.

  Once deployed: serves every election with only
  incremental maintenance costs.

  Node A    = Aadhaar e-KYC terminal (BEL already makes it)
  Node B    = same microcontroller as current EVMs
  Smart Card = same EMV lines as RuPay cards

  No new manufacturing capability needed.

2.3 Phased Investment Model

  Phase 1 (Years 1–2): Pilot
    Rs. 150–300 crore
    1,500 booths across 2–3 state elections

  Phase 2 (Years 2–3): Smart card rollout
    Rs. 7,125–9,500 crore via UIDAI infrastructure

  Phase 3 (Years 3–5): Full Node A & B deployment
    Rs. 6,825–9,950 crore pre-election procurement
    cycles

====================================================
3. IMPLEMENTATION ROADMAP

Phase 1 — Pilot Programme (Year 1–2):

  - Select 2–3 state assembly elections
  - Deploy Zero-Gap in 500 booths per state
  - Run parallel with existing EVM system
  - Collect biometric success rates, auth time,
    uptime data
  - Publish independent audit via ECI TEC

Phase 2 — Infrastructure Build-Out (Year 2–3):

  - National Voter ID Smart Card rollout via UIDAI
  - Manufacture Node A & B through BEL at national
    scale
  - Train election officials on dual-node workflow
  - Establish QR signing key management under ECI
    authority
  - Amend Conduct of Elections Rules 1961

Phase 3 — National Deployment (Year 3–5):

  - Full deployment for Lok Sabha General Elections
  - Retired EVMs evaluated for Node B repurposing
  - VVPAT audit upgraded to 100% recount capability
  - Parliamentary amendment to RPA 1951

====================================================
4. ADDRESSING ANTICIPATED OBJECTIONS

"Digital systems can always be hacked."

The Zero-Gap architecture agrees — which is why
security does not rely on software integrity. The
physical airgap, hardware watchdog, and paper VVPAT
mean that even a fully compromised software stack
cannot alter election outcomes without physically
detectable evidence.

"Biometric authentication will fail for rural/elderly."

Dual-biometric: fingerprint primary, iris fallback —
same redundancy used by Aadhaar across 1.4 billion
enrollees. Iris specifically addresses worn fingerprints
of agricultural and manual-labour voters.

"Too complex and expensive to deploy."

  Node A  = Aadhaar terminal already made by BEL
  Node B  = same microcontroller as current EVMs
  VVPAT   = already mandated by Supreme Court

This tightens integration, not new hardware.

"Who controls the QR signing keys?"

Managed exclusively by ECI under the same constitutional
protections as current EVM firmware. A multi-party key
ceremony ensures no single actor controls the key.

"What if Node A server connection fails at a rural booth?"

Node A needs only a momentary exchange — like a UPI
transaction. Offline queue mode buffers requests during
connectivity interruption with zero impact on Node B.

====================================================
SECTION 4 — GLOBAL PRECEDENTS & VALIDATION
====================================================

Estonia (2005–Present):

First country to deploy NFC chip national ID cards for
voting. EMV-standard chip card — identical to Zero-Gap's
Voter ID Smart Card proposal. Two decades, zero
successful large-scale manipulation. Proves chip-based
voter authentication works at national scale.

Brazil (2008–Present):

Biometric fingerprint authentication for EVM access.
156 million voters covered nationally by 2022. Directly
parallels Node A's biometric authentication role.
Paper-verified audit trail with each vote — validates
VVPAT integration.

Philippines (2010–Present):

Automated Count Machines where the paper ballot is the
primary legal record, and the digital count is the
derived record. Architecturally identical to Zero-Gap's
VVPAT principle.

Netherlands (2008) — Cautionary Tale:

Scrapped entire e-voting programme after researchers
proved RF signals from machines revealed vote choices
from outside the polling booth. Zero-Gap's optical
isolation is a direct design response to exactly this
class of vulnerability.

  Country      | Key Feature         | Zero-Gap Parallel    | Status
  -------------+---------------------+----------------------+------------
  Estonia      | NFC chip voter ID   | Section 5 Smart Card | Active 2005
  Brazil       | Biometric EVM       | Node A auth          | Active 2008
  Philippines  | Paper = legal       | VVPAT ground truth   | Active 2010
               | record              |                      |
  Netherlands  | Scrapped RF voting  | Validates airgap     | Precedent
               |                     | design               |

====================================================
SECTION 5 — CONCLUSION
====================================================

The Zero-Gap Voting Architecture anchors trust in
physics, mathematics, and irreversible hardware —
not software.

  - Optical airgap:        Network attacks impossible
                            (no network exists)
  - Cryptographic hash:    Memory tampering detectable
    chain                   and self-defeating
  - Hardware watchdog:     Software crashes cannot
                            corrupt vote state
  - VVPAT integration:     Manipulation visible to
                            voter before any record is
                            committed
  - Triple reconciliation: Disputes resolvable with
                            mathematical certainty

This architecture raises the bar for interference to
a level requiring simultaneous physical access,
cryptographic compromise, and real-time hardware
intervention — not operationally viable for any
adversary.

It transforms the question from:

  "Can we trust this software?"

to:

  "Can we trust physics and mathematics?"

— and the answer to the second question is yes.

====================================================

Submitted as an open blueprint for prototyping,
independent technical review, and consideration by the
Election Commission of India, UIDAI, and MeitY.

Proposed by: Roshan Kr Singh
Contact:     roshofficialmail@icloud.com
Date:        April 2026

====================================================

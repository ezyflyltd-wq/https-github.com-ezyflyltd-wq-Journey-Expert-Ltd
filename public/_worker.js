// BEGIN GENERATED META WEBHOOK
var JELMetaWebhook=(()=>{var _=Object.defineProperty;var N=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var P=Object.prototype.hasOwnProperty;var D=(t,e)=>{for(var i in e)_(t,i,{get:e[i],enumerable:!0})},H=(t,e,i,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of O(e))!P.call(t,n)&&n!==i&&_(t,n,{get:()=>e[n],enumerable:!(s=N(e,n))||s.enumerable});return t};var W=t=>H(_({},"__esModule",{value:!0}),t);var Y={};D(Y,{onRequest:()=>K});var m=(t,e=200)=>Response.json(t,{status:e,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});function G(t,e){return e==="bn"||e==="en"?e:/[\u0980-\u09FF]/.test(t)||/\b(ami|amar|amake|apni|apnar|tumi|tomar|chai|jabo|jete|koto|kivabe|ki|keno|kobe|hobe|korbo|korte|lagbe|bolen|diben|pari|parbo)\b/i.test(t)?"bn":"en"}function U(t,e){let i=t.toLocaleLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9\u0980-\u09FF'& ]+/g," ").replace(/\s+/g," ").trim();if(/hotline|phone|contact|whatsapp|হটলাইন|ফোন|নম্বর|নাম্বার|যোগাযোগ|হোয়াটসঅ্যাপ|হোয়াটসঅ্যাপ/i.test(i))return null;let s=e==="bn",n=(r,a)=>({reply:s?r:a,language:e,mode:"conversation",primaryIntent:"conversation",groundingIds:[]});return/^(hi|hello|hey|assalamu alaikum|salam|আসসালামু আলাইকুম|সালাম|হ্যালো|হাই)$/.test(i)?n("\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u0987\u0995\u09C1\u09AE \u0986\u09B8\u09B8\u09BE\u09B2\u09BE\u09AE\u0964 \u0986\u09AE\u09BF \u0985\u09CD\u09AF\u09BE\u099E\u09CD\u099C\u09C7\u09B2\u09BE, Journey Expert Limited-\u098F\u09B0 AI \u09B8\u09B9\u0995\u09BE\u09B0\u09C0\u0964 \u09AC\u09BE\u0982\u09B2\u09BE \u09AC\u09BE English\u2014\u09A6\u09C1\u0987 \u09AD\u09BE\u09B7\u09BE\u09A4\u09C7\u0987 \u0995\u09A5\u09BE \u09AC\u09B2\u09A4\u09C7 \u09AA\u09BE\u09B0\u09BF\u0964 \u0995\u09C0 \u099C\u09BE\u09A8\u09A4\u09C7 \u099A\u09BE\u09A8?","Wa Alaikum Assalam. I am Angela, Journey Expert Limited\u2019s AI assistant. I can speak in both Bangla and English. How can I help?"):/\b(can|could|do) (u|you) (talk|speak) ((?:in|to) )?(bangla|bengla|bengali)\b/.test(i)||/\b(talk|speak) (bangla|bengla|bengali)\b/.test(i)||/বাংলা (বলতে|কথা বলতে) (পারো|পারেন|পারি)/.test(i)||/তুমি কি বাংলা/.test(i)||/আপনি কি বাংলা/.test(i)?n("\u09B9\u09CD\u09AF\u09BE\u0981, \u0986\u09AE\u09BF \u09AC\u09BE\u0982\u09B2\u09BE\u09AF\u09BC \u0995\u09A5\u09BE \u09AC\u09B2\u09A4\u09C7 \u0993 \u0989\u09A4\u09CD\u09A4\u09B0 \u09A6\u09BF\u09A4\u09C7 \u09AA\u09BE\u09B0\u09BF\u0964 \u0986\u09AA\u09A8\u09BF \u09AC\u09BE\u0982\u09B2\u09BE\u09AF\u09BC, Banglish-\u098F \u09AC\u09BE English-\u098F \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8\u0964 \u0986\u09AE\u09BF Journey Expert Limited-\u098F\u09B0 \u09B8\u09C7\u09AC\u09BE \u098F\u09AC\u0982 travel/study \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09BF\u09A4 \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7\u0993 \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09BF\u0964","Yes. I can speak and reply in Bangla. You can ask in Bangla, Banglish, or English, and I can help with Journey Expert Limited services and general travel/study questions."):/\b(can|could|do) (u|you) (talk|speak) (in )?english\b/.test(i)||/ইংরেজি (বলতে|কথা বলতে) (পারো|পারেন|পারি)/.test(i)?n("\u09B9\u09CD\u09AF\u09BE\u0981, \u0986\u09AE\u09BF English-\u098F\u0993 \u0995\u09A5\u09BE \u09AC\u09B2\u09A4\u09C7 \u0993 \u0989\u09A4\u09CD\u09A4\u09B0 \u09A6\u09BF\u09A4\u09C7 \u09AA\u09BE\u09B0\u09BF\u0964 \u0989\u09AA\u09B0\u09C7\u09B0 EN/\u09AC\u09BE\u0982\u09B2\u09BE selector \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AD\u09BE\u09B7\u09BE \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8\u0964","Yes. I can speak and reply in English as well. You can switch languages with the EN/\u09AC\u09BE\u0982\u09B2\u09BE selector."):/^(thanks|thank you|thx|ধন্যবাদ|অনেক ধন্যবাদ)$/.test(i)?n("\u09B8\u09CD\u09AC\u09BE\u0997\u09A4\u09AE\u0964 \u0986\u09B0 \u0995\u09C0 \u099C\u09BE\u09A8\u09A4\u09C7 \u099A\u09BE\u09A8?","You are welcome. What else would you like to know?"):/^(how are you|how r u|কেমন আছো|কেমন আছেন)$/.test(i)?n("\u0986\u09AE\u09BF \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4 \u0986\u099B\u09BF\u0964 \u0995\u09C0\u09AD\u09BE\u09AC\u09C7 \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09BF?","I am ready to help. What would you like to know?"):null}var q=`
Journey Expert Ltd. (JEL), Bangladesh.
Slogan: "Your Journey, Our Expertise."
Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh.
WhatsApp/Hotline: +8801926400400. Email: journeyexpertbd@gmail.com.
Core services: air ticketing; fare quotation; reissue/refund support; visa-document assistance; tours and travel; hotels; Hajj and Umrah; halal tourism; medical tourism; travel insurance; corporate travel management; Meet & Greet; Study Abroad.
Hajj & Umrah verified service scope: pilgrimage package planning; air travel coordination; Makkah/Madinah accommodation; ground transport; Ziyarat planning; pilgrim/group coordination; visa/document guidance. Exact package inclusions, prices, availability, Saudi visa/permit/health requirements, quotas and dates are time-sensitive and must be verified before being presented as current.
JEL Study Abroad services: profile assessment; country/course/university selection; admissions guidance; scholarships; SOP guidance; English-language test guidance; student-visa document preparation; pre-departure and post-arrival guidance.
Detailed Study Abroad portal: journeyexpertbd.com.
Main Journey Expert corporate portal: journeyexpertltd.com.
Known JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla.
`,L=[{id:"contact",priority:50,keywords:["hotline","phone number","contact number","telephone","whatsapp","\u09B9\u099F\u09B2\u09BE\u0987\u09A8","\u09AB\u09CB\u09A8 \u09A8\u09AE\u09CD\u09AC\u09B0","\u09AB\u09CB\u09A8 \u09A8\u09BE\u09AE\u09CD\u09AC\u09BE\u09B0","\u09A8\u09BE\u09AE\u09CD\u09AC\u09BE\u09B0","\u09A8\u09AE\u09CD\u09AC\u09B0","\u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997","\u09B9\u09CB\u09AF\u09BC\u09BE\u099F\u09B8\u0985\u09CD\u09AF\u09BE\u09AA","\u09B9\u09CB\u09DF\u09BE\u099F\u09B8\u0985\u09CD\u09AF\u09BE\u09AA"],facts:"Journey Expert Limited hotline and WhatsApp: 01926400400 in Bangladesh, +8801926400400 internationally.",bn:"\u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09B9\u099F\u09B2\u09BE\u0987\u09A8 \u0993 WhatsApp \u09A8\u09AE\u09CD\u09AC\u09B0 01926400400\u0964 \u09AC\u09BF\u09A6\u09C7\u09B6 \u09A5\u09C7\u0995\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF +8801926400400 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8\u0964",en:"Our hotline and WhatsApp number is 01926400400 in Bangladesh, or +8801926400400 internationally."},{id:"services_overview",priority:120,keywords:["what services","which services","services provide","services does","services offer","jel services","journey expert services","all services","\u0995\u09BF \u0995\u09BF \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8","\u0995\u09C0 \u0995\u09C0 \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8","\u0995\u09BF \u0995\u09BF \u09B8\u09C7\u09AC\u09BE","\u0995\u09C0 \u0995\u09C0 \u09B8\u09C7\u09AC\u09BE","\u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8 \u09A6\u09C7\u09DF","\u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8 \u09A6\u09C7\u09AF\u09BC","\u09B8\u09AC \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8","\u09B8\u0995\u09B2 \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8"],facts:"Journey Expert Limited verified core services: air ticketing and fare quotation; reissue/refund support; visa-document assistance; tours and travel; hotels; Hajj and Umrah; halal tourism; medical tourism; travel insurance; corporate travel management; Meet & Greet; Study Abroad; and compliance/advisory support. Known verified brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla. Hotline and WhatsApp: 01926400400 (+8801926400400).",bn:"Journey Expert Limited (JEL)-\u098F\u09B0 verified core services \u09B9\u09B2\u09CB: air ticketing \u0993 fare quotation, reissue/refund support, visa-document assistance, tours & travel, hotel, Hajj & Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad \u098F\u09AC\u0982 compliance/advisory support\u0964 Known verified brand/co-brand: JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory \u098F\u09AC\u0982 Craft Bangla\u0964 Hotline \u0993 WhatsApp: 01926400400 (+8801926400400)\u0964",en:"Journey Expert Limited (JEL) provides air ticketing and fare quotation, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad, and compliance/advisory support. Known verified brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla. Hotline and WhatsApp: 01926400400 (+8801926400400)."},{id:"hajj_umrah",priority:100,keywords:["hajj","umrah","\u09B9\u099C","\u0993\u09AE\u09B0\u09BE\u09B9","\u0989\u09AE\u09B0\u09BE\u09B9","makkah","madinah","\u09AE\u0995\u09CD\u0995\u09BE","\u09AE\u09A6\u09BF\u09A8\u09BE","nusuk","\u09A8\u09C1\u09B8\u09C1\u0995","ziyarat","\u099C\u09BF\u09DF\u09BE\u09B0\u09A4","\u099C\u09BF\u09AF\u09BC\u09BE\u09B0\u09A4","rawda","rawdah"],facts:"JEL Hajj & Umrah scope: pilgrimage package planning; air-travel coordination; Makkah/Madinah accommodation; ground transport; Ziyarat planning; pilgrim/group coordination; visa/document guidance. Exact package inclusions, prices, availability, Saudi visa/permit/health rules, quotas and dates are time-sensitive and must be verified from current official or supplier sources.",bn:"Journey Expert Limited \u09B9\u099C \u0993 \u0993\u09AE\u09B0\u09BE\u09B9 \u09AC\u09BF\u09B7\u09DF\u09C7 package planning, air travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination \u098F\u09AC\u0982 visa/document guidance-\u098F \u09B8\u09B9\u09BE\u09DF\u09A4\u09BE \u0995\u09B0\u09C7\u0964 \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F price, availability, Saudi visa/permit/health rules, quota \u0993 dates current official source \u09AC\u09BE supplier \u09A5\u09C7\u0995\u09C7 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",en:"Journey Expert Limited supports Hajj and Umrah package planning, air-travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination, and visa/document guidance. Exact prices, availability, Saudi visa/permit/health rules, quotas, and dates must be verified from current official or supplier sources."},{id:"study_abroad",priority:95,keywords:["study abroad","student visa","student","study","university","course","admission","scholarship","sop","ielts","masters","bachelor","cas","coe","i-20","i20","\u09B8\u09CD\u099F\u09BE\u09A1\u09BF","\u09B8\u09CD\u099F\u09C1\u09A1\u09C7\u09A8\u09CD\u099F","\u09AC\u09BF\u09B6\u09CD\u09AC\u09AC\u09BF\u09A6\u09CD\u09AF\u09BE\u09B2","\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09B6\u09A8","\u09B8\u09CD\u0995\u09B2\u09BE\u09B0\u09B6\u09BF\u09AA","\u09AA\u09DC\u09BE\u09B6\u09CB\u09A8\u09BE","\u09AA\u09A1\u09BC\u09BE\u09B6\u09CB\u09A8\u09BE"],facts:"JEL Study Abroad scope: profile assessment; country/course/university selection; admissions guidance; scholarship guidance; SOP guidance; English-language test guidance; student-visa document preparation; pre-departure and post-arrival guidance. Dedicated portal: journeyexpertbd.com. Admission, scholarship and visa outcomes are never guaranteed.",bn:"JEL Study Abroad \u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2 assessment, \u09A6\u09C7\u09B6/\u0995\u09CB\u09B0\u09CD\u09B8/\u09AC\u09BF\u09B6\u09CD\u09AC\u09AC\u09BF\u09A6\u09CD\u09AF\u09BE\u09B2\u09DF \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8, admission \u0993 scholarship guidance, SOP, English-language test guidance, student-visa documents \u098F\u09AC\u0982 pre-departure/post-arrival guidance \u09A6\u09C7\u09DF\u0964 Admission, scholarship \u09AC\u09BE visa outcome \u0997\u09CD\u09AF\u09BE\u09B0\u09BE\u09A8\u09CD\u099F\u09BF \u0995\u09B0\u09BE \u09B9\u09DF \u09A8\u09BE\u0964",en:"JEL Study Abroad supports profile assessment, country/course/university selection, admissions and scholarship guidance, SOP, English-language tests, student-visa documents, and pre-/post-arrival guidance. Admission, scholarship, and visa outcomes are not guaranteed."},{id:"medical_tourism",priority:92,keywords:["medical tourism","medical visa","hospital","doctor","treatment","\u09AE\u09C7\u09A1\u09BF\u0995\u09C7\u09B2 \u099F\u09CD\u09AF\u09C1\u09B0\u09BF\u099C\u09AE","\u09AE\u09C7\u09A1\u09BF\u0995\u09C7\u09B2 \u09AD\u09BF\u09B8\u09BE","\u09B9\u09BE\u09B8\u09AA\u09BE\u09A4\u09BE\u09B2","\u09A1\u09BE\u0995\u09CD\u09A4\u09BE\u09B0","\u099A\u09BF\u0995\u09BF\u09CE\u09B8\u09BE"],facts:"JEL medical-tourism support can cover hospital/doctor selection support, appointment coordination and travel preparation. Treatment availability and medical outcomes must be verified with the official provider and are not guaranteed by JEL.",bn:"Journey Expert Limited medical-tourism support-\u098F hospital/doctor selection support, appointment coordination \u098F\u09AC\u0982 travel preparation-\u098F \u09B8\u09B9\u09BE\u09DF\u09A4\u09BE \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964 Treatment availability \u0993 medical outcome official provider-\u098F\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",en:"Journey Expert Limited can support medical-tourism enquiries with hospital/doctor selection support, appointment coordination, and travel preparation. Treatment availability and medical outcomes must be verified with the official provider."},{id:"air_ticketing",priority:88,keywords:["air ticket","ticketing","flight","fare","reissue","refund","ticket","\u098F\u09DF\u09BE\u09B0 \u099F\u09BF\u0995\u09BF\u099F","\u098F\u09AF\u09BC\u09BE\u09B0 \u099F\u09BF\u0995\u09BF\u099F","\u099F\u09BF\u0995\u09BF\u099F","\u09AB\u09CD\u09B2\u09BE\u0987\u099F","\u09AB\u09C7\u09DF\u09BE\u09B0","\u09AB\u09C7\u09AF\u09BC\u09BE\u09B0","\u09B0\u09BF\u0987\u09B8\u09CD\u09AF\u09C1","\u09B0\u09BF\u09AB\u09BE\u09A8\u09CD\u09A1","\u09AD\u09BE\u09DC\u09BE","\u09AD\u09BE\u09A1\u09BC\u09BE"],facts:"JEL air-ticketing scope: air tickets; fare quotation; reissue support; refund support. Live fares, seats, schedules, baggage rules, change/refund rules and booking status are supplier-dependent and must be verified before being presented as current.",bn:"Journey Expert Limited air ticketing, fare quotation, reissue \u098F\u09AC\u0982 refund support \u09A6\u09C7\u09DF\u0964 Live fare, seat, schedule, baggage, change/refund rule \u0993 booking status supplier-\u098F\u09B0 live data \u09A5\u09C7\u0995\u09C7 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",en:"Journey Expert Limited provides air ticketing, fare quotation, reissue, and refund support. Live fares, seats, schedules, baggage, change/refund rules, and booking status must be verified from current supplier data."},{id:"visa",priority:80,keywords:["visa","embassy","immigration","document checklist","\u09AD\u09BF\u09B8\u09BE","\u098F\u09AE\u09CD\u09AC\u09BE\u09B8\u09BF","\u0987\u09AE\u09BF\u0997\u09CD\u09B0\u09C7\u09B6\u09A8","\u09A1\u0995\u09C1\u09AE\u09C7\u09A8\u09CD\u099F"],facts:"JEL provides visa-document assistance. Requirements vary by country and visa type and may include passport, photographs, financial evidence, academic/employment records and travel-purpose evidence. Current requirements, fees, processing times, eligibility and decisions must be verified from relevant official sources; JEL never guarantees approval.",bn:"Journey Expert Limited visa-document assistance \u09A6\u09C7\u09DF\u0964 Requirement \u09A6\u09C7\u09B6 \u0993 visa type \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0 \u09AC\u09A6\u09B2\u09BE\u09DF; current checklist, fee, processing time, eligibility \u0993 decision official source \u09A5\u09C7\u0995\u09C7 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 JEL visa approval \u0997\u09CD\u09AF\u09BE\u09B0\u09BE\u09A8\u09CD\u099F\u09BF \u09A6\u09C7\u09DF \u09A8\u09BE\u0964",en:"Journey Expert Limited provides visa-document assistance. Requirements vary by country and visa type; current checklists, fees, processing times, eligibility, and decisions must be verified from official sources. JEL never guarantees visa approval."},{id:"tours_hotels",priority:72,keywords:["tour package","travel package","tour","hotel","package","holiday","\u099F\u09CD\u09AF\u09C1\u09B0","\u09B9\u09CB\u099F\u09C7\u09B2","\u09AA\u09CD\u09AF\u09BE\u0995\u09C7\u099C","\u09AD\u09CD\u09B0\u09AE\u09A3"],facts:"JEL supports tours, hotels and travel packages. Planning depends on destination, approximate date, traveller count, duration, budget and preferences. Live hotel/flight/package availability and prices must be verified from suppliers.",bn:"Journey Expert Limited tours, hotels \u098F\u09AC\u0982 travel package support \u09A6\u09C7\u09DF\u0964 Destination, date, traveller count, duration, budget \u0993 preference \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0 plan \u0995\u09B0\u09BE \u09AF\u09BE\u09DF; live availability \u0993 price supplier \u09A5\u09C7\u0995\u09C7 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",en:"Journey Expert Limited supports tours, hotels, and travel packages. Planning depends on destination, dates, traveller count, duration, budget, and preferences; live availability and prices must be verified from suppliers."},{id:"halal_tourism",priority:70,keywords:["halal tourism","halal travel","\u09B9\u09BE\u09B2\u09BE\u09B2 \u099F\u09CD\u09AF\u09C1\u09B0\u09BF\u099C\u09AE","\u09B9\u09BE\u09B2\u09BE\u09B2 \u099F\u09CD\u09B0\u09BE\u09AD\u09C7\u09B2"],facts:"JEL halal-tourism support can plan trips around destination, travel dates, family/group size and halal-friendly preferences. Live supplier availability must be verified.",bn:"Journey Expert Limited halal-tourism support \u09A6\u09C7\u09DF\u0964 Destination, travel date, family/group size \u098F\u09AC\u0982 halal-friendly preference \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0 trip framework \u0995\u09B0\u09BE \u09AF\u09BE\u09DF; live supplier availability \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",en:"Journey Expert Limited supports halal-tourism planning around destination, dates, family/group size, and halal-friendly preferences; live supplier availability must be verified."},{id:"corporate_travel",priority:68,keywords:["corporate travel","business travel","corporate","\u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u099F \u099F\u09CD\u09B0\u09BE\u09AD\u09C7\u09B2","\u0995\u09B0\u09CD\u09AA\u09CB\u09B0\u09C7\u099F"],facts:"JEL corporate-travel scope includes business-travel planning, ticketing coordination, hotel support, itinerary assistance and corporate travel workflow support. Route, traveller count and company travel-policy requirements are useful inputs.",bn:"Journey Expert Limited corporate travel management-\u098F business-travel planning, ticketing coordination, hotel support, itinerary assistance \u098F\u09AC\u0982 corporate workflow support \u09A6\u09C7\u09DF\u0964",en:"Journey Expert Limited supports corporate travel with business-travel planning, ticketing coordination, hotel support, itinerary assistance, and corporate workflow support."},{id:"insurance",priority:66,keywords:["travel insurance","insurance","\u0987\u09A8\u09CD\u09B8\u09CD\u09AF\u09C1\u09B0\u09C7\u09A8\u09CD\u09B8","\u09AC\u09C0\u09AE\u09BE"],facts:"JEL provides travel-insurance assistance. Coverage, premium and eligibility depend on insurer and trip and must be verified for the specific traveller and itinerary.",bn:"Journey Expert Limited travel-insurance assistance \u09A6\u09C7\u09DF\u0964 Coverage, premium \u0993 eligibility insurer \u098F\u09AC\u0982 trip \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0 \u09AC\u09A6\u09B2\u09BE\u09DF, \u09A4\u09BE\u0987 specific traveller \u0993 itinerary \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",en:"Journey Expert Limited provides travel-insurance assistance. Coverage, premium, and eligibility depend on the insurer and trip and must be verified for the specific traveller and itinerary."},{id:"meet_greet",priority:64,keywords:["meet & greet","meet and greet","airport assistance","airport support","\u09AE\u09BF\u099F \u0985\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1 \u0997\u09CD\u09B0\u09BF\u099F","\u098F\u09DF\u09BE\u09B0\u09AA\u09CB\u09B0\u09CD\u099F \u09B8\u09B9\u09BE\u09DF\u09A4\u09BE","\u098F\u09AF\u09BC\u09BE\u09B0\u09AA\u09CB\u09B0\u09CD\u099F \u09B8\u09B9\u09BE\u09AF\u09BC\u09A4\u09BE"],facts:"JEL Meet & Greet is a Journey Expert Limited service/co-brand for airport arrival/departure-related assistance. Exact service scope should be verified using airport, date, flight and passenger details.",bn:"JEL Meet & Greet airport arrival/departure-related assistance-\u098F\u09B0 service/co-brand\u0964 Airport, date, flight \u0993 passenger details \u0985\u09A8\u09C1\u09AF\u09BE\u09DF\u09C0 exact service scope \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964",en:"JEL Meet & Greet is a Journey Expert Limited service/co-brand for airport arrival/departure-related assistance. Exact scope should be verified using airport, date, flight, and passenger details."},{id:"brands",priority:55,keywords:["craft bangla","compliance","advisory","brand","co-brand","\u0995\u09CD\u09B0\u09BE\u09AB\u099F \u09AC\u09BE\u0982\u09B2\u09BE","\u0995\u09AE\u09AA\u09CD\u09B2\u09BE\u09DF\u09C7\u09A8\u09CD\u09B8","\u09AC\u09CD\u09B0\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1"],facts:"Known verified JEL brands/co-brands: JEL Study Abroad; JEL Meet & Greet; JEL Compliance & Advisory; Craft Bangla.",bn:"Verified JEL brand/co-brand-\u098F\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory \u098F\u09AC\u0982 Craft Bangla \u09B0\u09DF\u09C7\u099B\u09C7\u0964",en:"Verified JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla."},{id:"company",priority:40,keywords:["journey expert","jel","company","about","slogan","office","address","contact","phone","whatsapp","email","\u099C\u09BE\u09B0\u09CD\u09A8\u09BF \u098F\u0995\u09CD\u09B8\u09AA\u09BE\u09B0\u09CD\u099F","\u0995\u09CB\u09AE\u09CD\u09AA\u09BE\u09A8\u09BF","\u09B8\u09CD\u09B2\u09CB\u0997\u09BE\u09A8","\u0985\u09AB\u09BF\u09B8","\u09A0\u09BF\u0995\u09BE\u09A8\u09BE","\u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997","\u09AB\u09CB\u09A8","\u09B9\u09CB\u09DF\u09BE\u099F\u09B8\u0985\u09CD\u09AF\u09BE\u09AA","\u0987\u09AE\u09C7\u0987\u09B2"],facts:'Journey Expert Limited (JEL), Bangladesh. Slogan: "Your Journey, Our Expertise." Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh. WhatsApp/Hotline: +8801926400400. Email: journeyexpertbd@gmail.com. Public portals: journeyexpertltd.com and journeyexpertbd.com.',bn:"Journey Expert Limited (JEL), Bangladesh\u0964 Slogan: \u201CYour Journey, Our Expertise.\u201D \u0985\u09AB\u09BF\u09B8: \u09E7\u09EE\u09EF/\u098F (\u09E8\u09AF\u09BC \u09A4\u09B2\u09BE), \u0986\u09AC\u09CD\u09A6\u09C1\u09B2 \u09AE\u09A4\u09BF\u09A8 \u0995\u09AE\u09AA\u09CD\u09B2\u09C7\u0995\u09CD\u09B8, \u09B9\u09BE\u099C\u09C0 \u09AE\u09B0\u09A3 \u0986\u09B2\u09C0 \u09B0\u09CB\u09A1, \u09A8\u09BE\u09AC\u09BF\u09B8\u09CD\u0995\u09CB \u09AE\u09CB\u09A1\u09BC, \u09A4\u09C7\u099C\u0997\u09BE\u0981\u0993, \u09A2\u09BE\u0995\u09BE-\u09E7\u09E8\u09E7\u09EB\u0964 WhatsApp/Hotline: +8801926400400; Email: journeyexpertbd@gmail.com\u0964",en:"Journey Expert Limited (JEL), Bangladesh. Slogan: \u201CYour Journey, Our Expertise.\u201D Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215. WhatsApp/Hotline: +8801926400400; Email: journeyexpertbd@gmail.com."}];function T(t){let e=String(t||"").toLocaleLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g," ").trim();if(/brand|ব্র্যান্ড|ব্রান্ড|co-brand/.test(e)&&/service|সার্ভিস|সেবা|contact|phone|ফোন|যোগাযোগ|hotline/.test(e)){let r=L.find(c=>c.id==="brands"),a={id:"company_directory",priority:130,keywords:[],facts:`Journey Expert Limited (JEL) provides air ticketing, fare quotations, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad, and compliance/advisory support. JEL Study Abroad also provides profile assessment, country/course/university selection, admissions, scholarship and SOP guidance, English-language test guidance, student-visa document preparation, and pre-/post-arrival support. Hotline and WhatsApp: 01926400400.
`+r.facts,bn:`Journey Expert Limited (JEL) air ticketing, fare quotation, reissue/refund support, visa-document assistance, tours & travel, hotel, Hajj & Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad \u098F\u09AC\u0982 compliance/advisory support \u09A6\u09C7\u09DF\u0964 JEL Study Abroad \u09AA\u09CD\u09B0\u09CB\u09AB\u09BE\u0987\u09B2 assessment, \u09A6\u09C7\u09B6/\u0995\u09CB\u09B0\u09CD\u09B8/\u09AC\u09BF\u09B6\u09CD\u09AC\u09AC\u09BF\u09A6\u09CD\u09AF\u09BE\u09B2\u09DF \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8, admission, scholarship, SOP, English-language test, student-visa documents \u098F\u09AC\u0982 pre-/post-arrival guidance \u09A6\u09C7\u09DF\u0964

`+r.bn+`

\u09B9\u099F\u09B2\u09BE\u0987\u09A8 \u0993 WhatsApp: 01926400400 (+8801926400400)\u0964`,en:`Journey Expert Limited (JEL) provides air ticketing, fare quotations, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad, and compliance/advisory support. JEL Study Abroad also provides profile assessment, country/course/university selection, admissions, scholarship and SOP guidance, English-language test guidance, student-visa document preparation, and pre-/post-arrival support.

`+r.en+`

Hotline and WhatsApp: 01926400400 (+8801926400400).`};return{primary:a,ids:["company_directory"],text:a.facts}}let i=L.map(r=>({entry:r,score:r.keywords.reduce((a,c)=>e.includes(c.toLocaleLowerCase())?a+(c.includes(" ")?4:1):a,0)})).filter(r=>r.score>0).sort((r,a)=>a.entry.priority-r.entry.priority||a.score-r.score),s=i[0]?.entry||null,n=i.slice(0,3).map(r=>r.entry);return{primary:s,ids:n.map(r=>r.id),text:n.length?n.map(r=>"["+r.id+"] "+r.facts).join(`
`):"[no_verified_match] No exact JEL knowledge entry matched. Do not invent a JEL-specific fact."}}function F(t,e){let i=T(e),s=i.primary?t==="bn"?i.primary.bn:i.primary.en:t==="bn"?"\u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7\u09B0 \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F \u09A4\u09A5\u09CD\u09AF\u099F\u09BF \u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 verified JEL knowledge-\u098F \u09A8\u09C7\u0987\u0964 \u09AD\u09C1\u09B2 \u09A4\u09A5\u09CD\u09AF \u09A6\u09C7\u0993\u09DF\u09BE\u09B0 \u09AC\u09A6\u09B2\u09C7 \u098F\u0987 \u0985\u0982\u09B6\u099F\u09BF verify \u0995\u09B0\u09BE \u09AA\u09CD\u09B0\u09DF\u09CB\u099C\u09A8\u0964":"That specific detail is not present in the current verified JEL knowledge. Rather than invent an answer, that detail needs to be verified.";if(i.primary?.id!=="contact"&&i.ids.includes("contact")){let n=L.find(r=>r.id==="contact");s+=`

`+(t==="bn"?n.bn:n.en)}return{reply:s,primaryIntent:i.primary?.id||"unverified",groundingIds:i.ids}}function B(t,e=""){return F(t,e)}async function M({request:t,env:e}){if(t.method!=="POST")return new Response(null,{status:405,headers:{Allow:"POST"}});let i=new URL(t.url),s=t.headers.get("origin");if(s&&s!==i.origin)return m({error:"origin_not_allowed"},403);let n;try{n=await t.json()}catch{return m({error:"invalid_json"},400)}let r=typeof n?.message=="string"?n.message.trim().slice(0,6e3):"";if(!r)return m({error:"message_required"},400);let a=G(r,n?.language),c=U(r,a);if(c)return m(c);let u=T(r),f=new Set(["company_directory","services_overview","hajj_umrah","study_abroad","medical_tourism","air_ticketing","visa","tours_hotels","halal_tourism","corporate_travel","insurance","meet_greet","brands","contact","company","identity"]),o=/^(?:what (?:are|services|does)|which services|list (?:your|all)|tell me about (?:your|jel)|আপনাদের (?:কি কি|কী কী|সেবা|সার্ভিস)|কি কি সেবা|কী কী সেবা)/i.test(r)||/^(?:hajj|umrah|visa|air ticketing|study abroad|tours|hotels|হজ|উমরাহ|ভিসা|স্টাডি)(?: services?| সার্ভিস| সেবা)?[?.!।\s]*$/i.test(r),g=["contact","identity","company_directory","brands"].includes(u.primary?.id||"")&&!/how|why|কেন|কিভাবে|কীভাবে/i.test(r);if(u.primary&&f.has(u.primary.id)&&(o||g))return m({...B(a,r),language:a,mode:"verified"});let y=(e.GEMINI_API_KEY||e.GEMINI_TTS_API_KEY||"").trim();if(!y)return m({reply:a==="bn"?"\u098F\u0987 \u09AE\u09C1\u09B9\u09C2\u09B0\u09CD\u09A4\u09C7 AI \u09B8\u0982\u09AF\u09CB\u0997 \u09AA\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u099A\u09CD\u099B\u09C7 \u09A8\u09BE\u0964 \u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u099F\u09BF \u0986\u09AC\u09BE\u09B0 \u09B2\u09BF\u0996\u09C1\u09A8 \u0985\u09A5\u09AC\u09BE Journey Expert Limited-\u098F\u09B0 WhatsApp 01926400400-\u098F \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964":"The AI connection is temporarily unavailable. Please retry or contact Journey Expert Limited on WhatsApp 01926400400.",language:a,mode:"ai_unavailable"});let E=Array.isArray(n?.history)?n.history.filter(l=>l&&typeof l.content=="string"&&l.content.trim()).slice(-10).map(l=>({role:l.role==="assistant"?"model":"user",parts:[{text:l.content.trim().slice(0,2e3)}]})):[],b=`You are Angela, the official AI Assistant of Journey Expert Ltd. in Bangladesh.

VERIFIED JEL SOURCE OF TRUTH:
${q}

RULES:
- Answer the user's actual question first.
- For Journey Expert Ltd. questions, the verified JEL facts above have priority. Never invent company facts, partnerships, prices, live inventory, booking status, payment status, visa outcomes, admission outcomes, scholarship outcomes, or processing times.
- When a query mentions Hajj or Umrah together with visa, hotel, flight, package, transport, Nusuk, permit, Makkah, Madinah or Ziyarat, treat Hajj/Umrah as the primary service context.
- You may answer general knowledge questions professionally using the model's knowledge.
- When a fact is current, time-sensitive, or may have changed, only call it current if Google Search grounding is enabled in this request; otherwise say it should be verified from the relevant official source.
- Never guarantee visa approval, immigration outcome, admission, scholarship, fare, seat, hotel inventory, refund, or consular decision.
- Never request passwords, OTPs, card numbers, bank credentials, or unnecessary sensitive document contents.
- Keep normal voice-friendly answers concise: usually 2-5 sentences unless the user asks for detail.
- Both journeyexpertltd.com and journeyexpertbd.com are JEL public portals. Answer verified JEL service questions directly on either portal instead of unnecessarily bouncing the user between sites.
- For detailed education counselling, journeyexpertbd.com is the dedicated JEL Study Abroad portal when useful.
${a==="bn"?"Reply in natural professional Bengali script. Keep brand names and technical terms in English where natural.":"Reply in concise professional English."}

RETRIEVED VERIFIED JEL CONTEXT:
${u.text}

STRICT SEMANTIC ACCURACY CONTRACT:
- For JEL-specific facts, use only the retrieved verified context.
- If the exact JEL-specific fact is absent, say it is not verified; do not fill the gap from model memory.
- Answer the exact service/topic asked about; do not substitute a neighbouring intent.
- Changing facts such as price, inventory, rules, fees, dates and processing times require current official/supplier verification.`,x=["gemini-3.5-flash-lite","gemini-3.8-flash"];for(let l of x){let p=new AbortController,h=setTimeout(()=>p.abort(),l==="gemini-3.5-flash-lite"?6500:3500);try{let v={systemInstruction:{parts:[{text:b}]},contents:[...E,{role:"user",parts:[{text:r}]}],generationConfig:{maxOutputTokens:720}};l==="gemini-3.8-flash"&&(v.generationConfig.thinkingConfig={thinkingLevel:"low"}),e.GOOGLE_SEARCH_GROUNDING==="true"&&(v.tools=[{google_search:{}}]);let k=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(l)}:generateContent`,{method:"POST",signal:p.signal,headers:{"Content-Type":"application/json","x-goog-api-key":y},body:JSON.stringify(v)});if([401,403,429].includes(k.status))break;if(!k.ok)continue;let S=(await k.json())?.candidates?.[0],A=S?.content?.parts?.filter(w=>!w.thought&&typeof w.text=="string").map(w=>w.text).join("").trim();if(!A||a==="bn"&&!/[\u0980-\u09FF]/.test(A)||a==="en"&&/[\u0980-\u09FF]/.test(A))continue;return m({reply:A,language:a,mode:"ai",providerModel:l,grounded:!!S?.groundingMetadata,primaryIntent:u.primary?.id||"unverified",groundingIds:u.ids})}catch{}finally{clearTimeout(h)}}return m({reply:a==="bn"?"\u098F\u0987 \u09AE\u09C1\u09B9\u09C2\u09B0\u09CD\u09A4\u09C7 AI \u09B8\u09C7\u09AC\u09BE \u09A5\u09C7\u0995\u09C7 \u0986\u09AA\u09A8\u09BE\u09B0 \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7\u09B0 \u0989\u09A4\u09CD\u09A4\u09B0 \u09AA\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u09A8\u09BF\u0964 \u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u0986\u09AC\u09BE\u09B0 \u099A\u09C7\u09B7\u09CD\u099F\u09BE \u0995\u09B0\u09C1\u09A8 \u0985\u09A5\u09AC\u09BE WhatsApp 01926400400-\u098F \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8\u0964":"The AI service could not answer this specific question right now. Please retry or contact WhatsApp 01926400400.",language:a,mode:"ai_unavailable"})}var V={"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"},d=(t,e)=>new Response(e,{status:t,headers:V});async function C(t,e,i){if(!i||!e||!/^sha256=[a-f0-9]{64}$/.test(e))return!1;let s=await crypto.subtle.importKey("raw",new TextEncoder().encode(i),{name:"HMAC",hash:"SHA-256"},!1,["verify"]),n=Uint8Array.from(e.slice(7).match(/../g),r=>parseInt(r,16));return crypto.subtle.verify("HMAC",s,n,t)}function j(t,e){let i=[];if(!Array.isArray(t?.entry))return i;for(let s of t.entry)if(t.object==="page"||t.object==="instagram"){let n=t.object==="page"?"messenger":"instagram",r=n==="messenger"?e.META_PAGE_ID:e.META_INSTAGRAM_ID;if(!r||String(s.id)!==r)continue;for(let a of Array.isArray(s.messaging)?s.messaging:[])!Number.isFinite(a.timestamp)||a.timestamp>Date.now()+3e5||a.timestamp<Date.now()-23*36e5||a.message?.is_echo||a.message?.is_deleted||a.message?.is_unsupported||String(a.recipient?.id)!==r||String(a.sender?.id)===r||typeof a.message?.mid!="string"||typeof a.message?.text!="string"||!a.sender?.id||i.push({channel:n,asset:r,sender:String(a.sender.id),id:a.message.mid,text:a.message.text.trim().slice(0,4e3)})}else if(t.object==="whatsapp_business_account"){if(!e.META_WABA_ID||String(s.id)!==e.META_WABA_ID)continue;for(let n of Array.isArray(s.changes)?s.changes:[]){let r=n.value;if(!(n.field!=="messages"||!e.META_WHATSAPP_PHONE_ID||r?.metadata?.phone_number_id!==e.META_WHATSAPP_PHONE_ID))for(let a of Array.isArray(r.messages)?r.messages:[]){let c=Number(a.timestamp)*1e3;!Number.isFinite(c)||c>Date.now()+3e5||c<Date.now()-23*36e5||a.type!=="text"||typeof a.text?.body!="string"||typeof a.id!="string"||!a.from||i.push({channel:"whatsapp",asset:e.META_WHATSAPP_PHONE_ID,sender:String(a.from),id:a.id,text:a.text.body.trim().slice(0,4e3)})}}}return i.filter(s=>s.text)}function J(t,e,i){if(!/^v\d+\.\d+$/.test(e.META_GRAPH_VERSION||""))throw new Error("Missing Graph version");let s=t.channel==="messenger"?e.META_PAGE_ACCESS_TOKEN:t.channel==="instagram"?e.META_INSTAGRAM_ACCESS_TOKEN:e.META_WHATSAPP_ACCESS_TOKEN;if(!s)throw new Error("Missing messaging token");return{url:`https://graph.facebook.com/${e.META_GRAPH_VERSION}/${encodeURIComponent(t.asset)}/messages`,options:{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(t.channel==="whatsapp"?{messaging_product:"whatsapp",to:t.sender,type:"text",text:{body:i.slice(0,1800)}}:{recipient:{id:t.sender},...t.channel==="messenger"?{messaging_type:"RESPONSE"}:{},message:{text:i.slice(0,1800)}})}}}async function R(t){let e=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(`${t.channel}:${t.asset}:${t.id}`));return Array.from(new Uint8Array(e),i=>i.toString(16).padStart(2,"0")).join("")}async function K({request:t,env:e,chatHandler:i=M}){if(t.method==="GET"){let o=new URL(t.url).searchParams;return e.META_VERIFY_TOKEN?o.get("hub.mode")!=="subscribe"||o.get("hub.verify_token")!==e.META_VERIFY_TOKEN||!o.has("hub.challenge")?d(403,"Forbidden"):d(200,o.get("hub.challenge")):d(503,"Webhook setup incomplete")}if(t.method!=="POST")return d(405,"Method not allowed");if(!e.META_APP_SECRET)return d(503,"Webhook setup incomplete");let s=t.body?.getReader();if(!s)return d(400,"Missing body");let n=[],r=0;for(;;){let o=await s.read();if(o.done)break;if(r+=o.value.length,r>256e3)return await s.cancel(),d(413,"Payload too large");n.push(o.value)}let a=new Uint8Array(r),c=0;for(let o of n)a.set(o,c),c+=o.length;if(!await C(a,t.headers.get("X-Hub-Signature-256"),e.META_APP_SECRET))return d(401,"Invalid signature");let u;try{u=JSON.parse(new TextDecoder().decode(a))}catch{return d(400,"Invalid JSON")}let f=j(u,e);if(f.length>50)return d(413,"Too many messages");if(!f.length)return d(200,"EVENT_RECEIVED");if(e.META_AUTO_REPLY_ENABLED!=="true"||!e.META_EVENTS)return d(503,"Messaging activation pending");try{for(let o of f)J(o,e,"");for(let o of f){let g=await R(o),y=crypto.randomUUID(),E=Date.now();if(!await e.META_EVENTS.prepare("INSERT INTO meta_events (event_key, state, claim, updated_at) VALUES (?, 'processing', ?, ?) ON CONFLICT(event_key) DO UPDATE SET claim=excluded.claim, updated_at=excluded.updated_at WHERE meta_events.state='processing' AND meta_events.updated_at < ? RETURNING event_key").bind(g,y,E,E-12e4).first()){if((await e.META_EVENTS.prepare("SELECT state FROM meta_events WHERE event_key=?").bind(g).first())?.state==="processing")return d(503,"Processing delivery");continue}let b;try{let p=await i({request:new Request("https://journeyexpertltd.com/angela/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:o.text})}),env:e}),h=await p.json();if(!p.ok||!h.reply?.trim())throw new Error("No answer");b=h.reply}catch{return await e.META_EVENTS.prepare("DELETE FROM meta_events WHERE event_key=? AND claim=? AND state='processing'").bind(g,y).run(),d(503,"Reply unavailable")}if(!await e.META_EVENTS.prepare("UPDATE meta_events SET state='sending', updated_at=? WHERE event_key=? AND claim=? AND state='processing' RETURNING event_key").bind(Date.now(),g,y).first())return d(503,"Delivery claim expired");let l="uncertain";try{let p=J(o,e,b),h=await fetch(p.url,{...p.options,signal:AbortSignal.timeout(8e3)}),v=await h.json();h.ok&&(v.message_id||v.messages?.[0]?.id)&&(l="sent")}catch{}await e.META_EVENTS.prepare("UPDATE meta_events SET state=?, updated_at=? WHERE event_key=? AND claim=?").bind(l,Date.now(),g,y).run()}return await e.META_EVENTS.prepare("DELETE FROM meta_events WHERE updated_at < ?").bind(Date.now()-30*864e5).run(),d(200,"EVENT_RECEIVED")}catch{return d(503,"Delivery temporarily unavailable")}}return W(Y);})();
// END GENERATED META WEBHOOK
const ALLOWED_ORIGIN = 'https://journeyexpertltd.com';

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'access-control-allow-origin': ALLOWED_ORIGIN,
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'Content-Type',
    'x-content-type-options': 'nosniff',
    'x-angela-backend': 'jel-ltd-advanced-worker-free-lite-20261010',
  },
});

const languageFor = (message, requested) => {
  if (requested === 'bn' || requested === 'en') return requested;
  if (/[\u0980-\u09FF]/.test(message)) return 'bn';
  if (/\b(ami|amar|amake|apni|apnar|tumi|tomar|chai|jabo|jete|koto|kivabe|ki|keno|kobe|hobe|korbo|korte|lagbe|bolen|diben|pari|parbo|porte|bidesh)\b/i.test(message)) return 'bn';
  return 'en';
};


const JEL_SEMANTIC_KNOWLEDGE = [
  {
    id: 'services_overview', priority: 120,
    keywords: ['what services','which services','services provide','services does','services offer','jel services','journey expert services','all services','কি কি সার্ভিস','কী কী সার্ভিস','কি কি সেবা','কী কী সেবা','সার্ভিস দেয়','সার্ভিস দেয়','সব সার্ভিস','সকল সার্ভিস'],
    facts: 'Journey Expert Limited verified core services: air ticketing and fare quotation; reissue/refund support; visa-document assistance; tours and travel; hotels; Hajj and Umrah; halal tourism; medical tourism; travel insurance; corporate travel management; Meet & Greet; Study Abroad; and compliance/advisory support. Known verified brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla. Hotline and WhatsApp: 01926400400 (+8801926400400).',
    bn: 'Journey Expert Limited (JEL)-এর verified core services হলো: air ticketing ও fare quotation, reissue/refund support, visa-document assistance, tours & travel, hotel, Hajj & Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad এবং compliance/advisory support। Known verified brand/co-brand: JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory এবং Craft Bangla। Hotline ও WhatsApp: 01926400400 (+8801926400400)।',
    en: 'Journey Expert Limited (JEL) provides air ticketing and fare quotation, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad, and compliance/advisory support. Known verified brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla. Hotline and WhatsApp: 01926400400 (+8801926400400).'
  },
  {
    id: 'hajj_umrah', priority: 100,
    keywords: ['hajj','umrah','হজ','ওমরাহ','উমরাহ','makkah','madinah','মক্কা','মদিনা','nusuk','নুসুক','ziyarat','জিয়ারত','জিয়ারত','rawda','rawdah'],
    facts: 'JEL Hajj & Umrah scope: pilgrimage package planning; air-travel coordination; Makkah/Madinah accommodation; ground transport; Ziyarat planning; pilgrim/group coordination; visa/document guidance. Exact package inclusions, prices, availability, Saudi visa/permit/health rules, quotas and dates are time-sensitive and must be verified from current official or supplier sources.',
    bn: 'Journey Expert Limited হজ ও ওমরাহ বিষয়ে package planning, air travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination এবং visa/document guidance-এ সহায়তা করে। নির্দিষ্ট price, availability, Saudi visa/permit/health rules, quota ও dates current official source বা supplier থেকে যাচাই করতে হবে।',
    en: 'Journey Expert Limited supports Hajj and Umrah package planning, air-travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination, and visa/document guidance. Exact prices, availability, Saudi visa/permit/health rules, quotas, and dates must be verified from current official or supplier sources.'
  },
  {
    id: 'study_abroad', priority: 95,
    keywords: ['study abroad','student visa','student','study','university','course','admission','scholarship','sop','ielts','masters','bachelor','cas','coe','i-20','i20','স্টাডি','স্টুডেন্ট','বিশ্ববিদ্যাল','অ্যাডমিশন','স্কলারশিপ','পড়াশোনা','পড়াশোনা'],
    facts: 'JEL Study Abroad scope: profile assessment; country/course/university selection; admissions guidance; scholarship guidance; SOP guidance; English-language test guidance; student-visa document preparation; pre-departure and post-arrival guidance. Dedicated portal: journeyexpertbd.com. Admission, scholarship and visa outcomes are never guaranteed.',
    bn: 'JEL Study Abroad প্রোফাইল assessment, দেশ/কোর্স/বিশ্ববিদ্যালয় নির্বাচন, admission ও scholarship guidance, SOP, English-language test guidance, student-visa documents এবং pre-departure/post-arrival guidance দেয়। Admission, scholarship বা visa outcome গ্যারান্টি করা হয় না।',
    en: 'JEL Study Abroad supports profile assessment, country/course/university selection, admissions and scholarship guidance, SOP, English-language tests, student-visa documents, and pre-/post-arrival guidance. Admission, scholarship, and visa outcomes are not guaranteed.'
  },
  {
    id: 'medical_tourism', priority: 92,
    keywords: ['medical tourism','medical visa','hospital','doctor','treatment','মেডিকেল ট্যুরিজম','মেডিকেল ভিসা','হাসপাতাল','ডাক্তার','চিকিৎসা'],
    facts: 'JEL medical-tourism support can cover hospital/doctor selection support, appointment coordination and travel preparation. Treatment availability and medical outcomes must be verified with the official provider and are not guaranteed by JEL.',
    bn: 'Journey Expert Limited medical-tourism support-এ hospital/doctor selection support, appointment coordination এবং travel preparation-এ সহায়তা করতে পারে। Treatment availability ও medical outcome official provider-এর মাধ্যমে যাচাই করতে হবে।',
    en: 'Journey Expert Limited can support medical-tourism enquiries with hospital/doctor selection support, appointment coordination, and travel preparation. Treatment availability and medical outcomes must be verified with the official provider.'
  },
  {
    id: 'air_ticketing', priority: 88,
    keywords: ['air ticket','ticketing','flight','fare','reissue','refund','ticket','এয়ার টিকিট','এয়ার টিকিট','টিকিট','ফ্লাইট','ফেয়ার','ফেয়ার','রিইস্যু','রিফান্ড','ভাড়া','ভাড়া'],
    facts: 'JEL air-ticketing scope: air tickets; fare quotation; reissue support; refund support. Live fares, seats, schedules, baggage rules, change/refund rules and booking status are supplier-dependent and must be verified before being presented as current.',
    bn: 'Journey Expert Limited air ticketing, fare quotation, reissue এবং refund support দেয়। Live fare, seat, schedule, baggage, change/refund rule ও booking status supplier-এর live data থেকে যাচাই করতে হবে।',
    en: 'Journey Expert Limited provides air ticketing, fare quotation, reissue, and refund support. Live fares, seats, schedules, baggage, change/refund rules, and booking status must be verified from current supplier data.'
  },
  {
    id: 'visa', priority: 80,
    keywords: ['visa','embassy','immigration','document checklist','ভিসা','এম্বাসি','ইমিগ্রেশন','ডকুমেন্ট'],
    facts: 'JEL provides visa-document assistance. Requirements vary by country and visa type and may include passport, photographs, financial evidence, academic/employment records and travel-purpose evidence. Current requirements, fees, processing times, eligibility and decisions must be verified from relevant official sources; JEL never guarantees approval.',
    bn: 'Journey Expert Limited visa-document assistance দেয়। Requirement দেশ ও visa type অনুযায়ী বদলায়; current checklist, fee, processing time, eligibility ও decision official source থেকে যাচাই করতে হবে। JEL visa approval গ্যারান্টি দেয় না।',
    en: 'Journey Expert Limited provides visa-document assistance. Requirements vary by country and visa type; current checklists, fees, processing times, eligibility, and decisions must be verified from official sources. JEL never guarantees visa approval.'
  },
  {
    id: 'tours_hotels', priority: 72,
    keywords: ['tour package','travel package','tour','hotel','package','holiday','ট্যুর','হোটেল','প্যাকেজ','ভ্রমণ'],
    facts: 'JEL supports tours, hotels and travel packages. Planning depends on destination, approximate date, traveller count, duration, budget and preferences. Live hotel/flight/package availability and prices must be verified from suppliers.',
    bn: 'Journey Expert Limited tours, hotels এবং travel package support দেয়। Destination, date, traveller count, duration, budget ও preference অনুযায়ী plan করা যায়; live availability ও price supplier থেকে যাচাই করতে হবে।',
    en: 'Journey Expert Limited supports tours, hotels, and travel packages. Planning depends on destination, dates, traveller count, duration, budget, and preferences; live availability and prices must be verified from suppliers.'
  },
  {
    id: 'halal_tourism', priority: 70,
    keywords: ['halal tourism','halal travel','হালাল ট্যুরিজম','হালাল ট্রাভেল'],
    facts: 'JEL halal-tourism support can plan trips around destination, travel dates, family/group size and halal-friendly preferences. Live supplier availability must be verified.',
    bn: 'Journey Expert Limited halal-tourism support দেয়। Destination, travel date, family/group size এবং halal-friendly preference অনুযায়ী trip framework করা যায়; live supplier availability যাচাই করতে হবে।',
    en: 'Journey Expert Limited supports halal-tourism planning around destination, dates, family/group size, and halal-friendly preferences; live supplier availability must be verified.'
  },
  {
    id: 'corporate_travel', priority: 68,
    keywords: ['corporate travel','business travel','corporate','কর্পোরেট ট্রাভেল','কর্পোরেট'],
    facts: 'JEL corporate-travel scope includes business-travel planning, ticketing coordination, hotel support, itinerary assistance and corporate travel workflow support. Route, traveller count and company travel-policy requirements are useful inputs.',
    bn: 'Journey Expert Limited corporate travel management-এ business-travel planning, ticketing coordination, hotel support, itinerary assistance এবং corporate workflow support দেয়।',
    en: 'Journey Expert Limited supports corporate travel with business-travel planning, ticketing coordination, hotel support, itinerary assistance, and corporate workflow support.'
  },
  {
    id: 'insurance', priority: 66,
    keywords: ['travel insurance','insurance','ইন্স্যুরেন্স','বীমা'],
    facts: 'JEL provides travel-insurance assistance. Coverage, premium and eligibility depend on insurer and trip and must be verified for the specific traveller and itinerary.',
    bn: 'Journey Expert Limited travel-insurance assistance দেয়। Coverage, premium ও eligibility insurer এবং trip অনুযায়ী বদলায়, তাই specific traveller ও itinerary অনুযায়ী যাচাই করতে হবে।',
    en: 'Journey Expert Limited provides travel-insurance assistance. Coverage, premium, and eligibility depend on the insurer and trip and must be verified for the specific traveller and itinerary.'
  },
  {
    id: 'meet_greet', priority: 64,
    keywords: ['meet & greet','meet and greet','airport assistance','airport support','মিট অ্যান্ড গ্রিট','এয়ারপোর্ট সহায়তা','এয়ারপোর্ট সহায়তা'],
    facts: 'JEL Meet & Greet is a Journey Expert Limited service/co-brand for airport arrival/departure-related assistance. Exact service scope should be verified using airport, date, flight and passenger details.',
    bn: 'JEL Meet & Greet airport arrival/departure-related assistance-এর service/co-brand। Airport, date, flight ও passenger details অনুযায়ী exact service scope যাচাই করতে হবে।',
    en: 'JEL Meet & Greet is a Journey Expert Limited service/co-brand for airport arrival/departure-related assistance. Exact scope should be verified using airport, date, flight, and passenger details.'
  },
  {
    id: 'brands', priority: 55,
    keywords: ['craft bangla','compliance','advisory','brand','co-brand','ক্রাফট বাংলা','কমপ্লায়েন্স','ব্র্যান্ড'],
    facts: 'Known verified JEL brands/co-brands: JEL Study Abroad; JEL Meet & Greet; JEL Compliance & Advisory; Craft Bangla.',
    bn: 'Verified JEL brand/co-brand-এর মধ্যে JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory এবং Craft Bangla রয়েছে।',
    en: 'Verified JEL brands/co-brands include JEL Study Abroad, JEL Meet & Greet, JEL Compliance & Advisory, and Craft Bangla.'
  },
  {
    id: 'company', priority: 40,
    keywords: ['journey expert','jel','company','about','slogan','office','address','contact','phone','whatsapp','email','জার্নি এক্সপার্ট','কোম্পানি','স্লোগান','অফিস','ঠিকানা','যোগাযোগ','ফোন','হোয়াটসঅ্যাপ','ইমেইল'],
    facts: 'Journey Expert Limited (JEL), Bangladesh. Slogan: "Your Journey, Our Expertise." Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh. WhatsApp/Hotline: +8801926400400. Email: journeyexpertbd@gmail.com. Public portals: journeyexpertltd.com and journeyexpertbd.com.',
    bn: 'Journey Expert Limited (JEL), Bangladesh। Slogan: “Your Journey, Our Expertise.” অফিস: ১৮৯/এ (২য় তলা), আব্দুল মতিন কমপ্লেক্স, হাজী মরণ আলী রোড, নাবিস্কো মোড়, তেজগাঁও, ঢাকা-১২১৫। WhatsApp/Hotline: +8801926400400; Email: journeyexpertbd@gmail.com।',
    en: 'Journey Expert Limited (JEL), Bangladesh. Slogan: “Your Journey, Our Expertise.” Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215. WhatsApp/Hotline: +8801926400400; Email: journeyexpertbd@gmail.com.'
  }
];

function retrieveJelKnowledge(query) {
  const normalized = String(query || '').toLocaleLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();

  // A combined directory question must not collapse to the brands-only entry.
  if (/brand|ব্র্যান্ড|ব্রান্ড|co-brand/.test(normalized)
      && /service|সার্ভিস|সেবা|contact|phone|ফোন|যোগাযোগ|hotline/.test(normalized)) {
    const brands = JEL_SEMANTIC_KNOWLEDGE.find(entry => entry.id === 'brands');
    const primary = {
      id: 'company_directory', priority: 130, keywords: [],
      facts: "Journey Expert Limited (JEL) provides air ticketing, fare quotations, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad, and compliance/advisory support. JEL Study Abroad also provides profile assessment, country/course/university selection, admissions, scholarship and SOP guidance, English-language test guidance, student-visa document preparation, and pre-/post-arrival support. Hotline and WhatsApp: 01926400400." + '\n' + brands.facts,
      bn: "Journey Expert Limited (JEL) air ticketing, fare quotation, reissue/refund support, visa-document assistance, tours & travel, hotel, Hajj & Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad এবং compliance/advisory support দেয়। JEL Study Abroad প্রোফাইল assessment, দেশ/কোর্স/বিশ্ববিদ্যালয় নির্বাচন, admission, scholarship, SOP, English-language test, student-visa documents এবং pre-/post-arrival guidance দেয়।\n\n" + brands.bn + '\n\nহটলাইন ও WhatsApp: 01926400400 (+8801926400400)।',
      en: "Journey Expert Limited (JEL) provides air ticketing, fare quotations, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, Study Abroad, and compliance/advisory support. JEL Study Abroad also provides profile assessment, country/course/university selection, admissions, scholarship and SOP guidance, English-language test guidance, student-visa document preparation, and pre-/post-arrival support." + '\n\n' + brands.en + '\n\nHotline and WhatsApp: 01926400400 (+8801926400400).',
    };
    return { primary, ids: ['company_directory'], text: primary.facts };
  }

  const scored = JEL_SEMANTIC_KNOWLEDGE
    .map((entry) => ({
      entry,
      score: entry.keywords.reduce((total, keyword) => normalized.includes(keyword.toLocaleLowerCase()) ? total + (keyword.includes(' ') ? 4 : 1) : total, 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => (b.entry.priority - a.entry.priority) || (b.score - a.score));
  const primary = scored[0]?.entry || null;
  const selected = scored.slice(0, 3).map((item) => item.entry);
  return {
    primary,
    ids: selected.map((entry) => entry.id),
    text: selected.length
      ? selected.map((entry) => '[' + entry.id + '] ' + entry.facts).join('\n')
      : '[no_verified_match] No exact JEL knowledge entry matched. Do not invent a JEL-specific fact.',
  };
}

function semanticFallback(language, message) {
  const retrieved = retrieveJelKnowledge(message);
  const reply = retrieved.primary
    ? (language === 'bn' ? retrieved.primary.bn : retrieved.primary.en)
    : (language === 'bn'
      ? 'আপনার প্রশ্নের নির্দিষ্ট তথ্যটি বর্তমান verified JEL knowledge-এ নেই। ভুল তথ্য দেওয়ার বদলে এই অংশটি verify করা প্রয়োজন।'
      : 'That specific detail is not present in the current verified JEL knowledge. Rather than invent an answer, that detail needs to be verified.');
  return {
    reply,
    primaryIntent: retrieved.primary?.id || 'unverified',
    groundingIds: retrieved.ids,
  };
}

const fallback = (language, message = '') => semanticFallback(language, message);

function conversationReply(message, language) {
  const q = String(message || '')
    .toLocaleLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[^a-z0-9\u0980-\u09FF'& ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const bn = language === 'bn';
  const answer = (bnText, enText) => ({
    reply: bn ? bnText : enText,
    language,
    mode: 'conversation',
    primaryIntent: 'conversation',
    groundingIds: [],
  });

  if (/^(hi|hello|hey|assalamu alaikum|salam|আসসালামু আলাইকুম|সালাম|হ্যালো|হাই)$/.test(q)) {
    return answer(
      'ওয়ালাইকুম আসসালাম। আমি অ্যাঞ্জেলা, Journey Expert Limited-এর AI সহকারী। বাংলা বা English—দুই ভাষাতেই কথা বলতে পারি। কী জানতে চান?',
      'Wa Alaikum Assalam. I am Angela, Journey Expert Limited’s AI assistant. I can speak in both Bangla and English. How can I help?'
    );
  }

  if (
    /\b(can|could|do) (u|you) (talk|speak) ((?:in|to) )?(bangla|bengla|bengali)\b/.test(q) ||
    /\b(talk|speak) (bangla|bengla|bengali)\b/.test(q) ||
    /বাংলা (বলতে|কথা বলতে) (পারো|পারেন|পারি)/.test(q) ||
    /তুমি কি বাংলা/.test(q) ||
    /আপনি কি বাংলা/.test(q)
  ) {
    return answer(
      'হ্যাঁ, আমি বাংলায় কথা বলতে ও উত্তর দিতে পারি। আপনি বাংলায়, Banglish-এ বা English-এ প্রশ্ন করতে পারেন। Journey Expert Limited-এর সেবা এবং travel/study সম্পর্কিত সাধারণ প্রশ্নেও আমি সাহায্য করতে পারি।',
      'Yes. I can speak and reply in Bangla. You can ask in Bangla, Banglish, or English, and I can help with Journey Expert Limited services and general travel/study questions.'
    );
  }

  if (
    /\b(can|could|do) (u|you) (talk|speak) (in )?english\b/.test(q) ||
    /ইংরেজি (বলতে|কথা বলতে) (পারো|পারেন|পারি)/.test(q)
  ) {
    return answer(
      'হ্যাঁ, আমি English-এও কথা বলতে ও উত্তর দিতে পারি। উপরের EN/বাংলা selector দিয়ে ভাষা বদলাতে পারেন।',
      'Yes. I can speak and reply in English as well. You can switch languages with the EN/বাংলা selector.'
    );
  }

  if (/^(thanks|thank you|thx|ধন্যবাদ|অনেক ধন্যবাদ)$/.test(q)) {
    return answer('স্বাগতম। আর কী জানতে চান?', 'You are welcome. What else would you like to know?');
  }

  if (/^(how are you|how r u|কেমন আছো|কেমন আছেন)$/.test(q)) {
    return answer('আমি প্রস্তুত আছি। কীভাবে সাহায্য করতে পারি?', 'I am ready to help. What would you like to know?');
  }

  return null;
}

async function liveToken(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const origin = request.headers.get('origin');
  const url = new URL(request.url);
  if (origin && origin !== url.origin) return json({ error: 'origin_not_allowed' }, 403);

  const keys = Array.from(new Set([
    env.GEMINI_API_KEY?.trim(),
    env.GEMINI_TTS_API_KEY?.trim(),
  ].filter(Boolean)));
  if (!keys.length) return json({ error: 'live_voice_not_configured' }, 503);

  const model = 'gemini-3.8-live';
  const expireTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  let sawQuota = false;
  const providerStatuses = [];

  for (const key of keys) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      let upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/auth_tokens', {
        method: 'POST',
        signal: controller.signal,
        headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          uses: 1,
          expireTime,
          liveConnectConstraints: {
            model: 'models/gemini-3.8-live',
            config: {
              sessionResumption: {},
              responseModalities: ['AUDIO'],
            },
          },
        }),
      });

      if (upstream.status === 400) {
        providerStatuses.push(400);
        upstream = await fetch('https://generativelanguage.googleapis.com/v1beta/auth_tokens', {
          method: 'POST',
          signal: controller.signal,
          headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            uses: 1,
            expireTime,
            newSessionExpireTime: new Date(Date.now() + 60 * 1000).toISOString(),
          }),
        });
      }

      if (!upstream.ok) {
        providerStatuses.push(upstream.status);
        const detail = await upstream.text().catch(() => '');
        console.warn('Angela Worker Live token provider status', upstream.status, detail.slice(0, 240));
        if (upstream.status === 429) {
          sawQuota = true;
          continue;
        }
        if (upstream.status === 401 || upstream.status === 403) continue;
        continue;
      }

      const data = await upstream.json();
      const token = typeof data?.name === 'string' ? data.name : '';
      if (!token) continue;
      return json({ token, model, expiresAt: expireTime });
    } catch (error) {
      console.warn('Angela Worker Live token error', controller.signal.aborted ? 'timeout' : (error?.message || 'unknown'));
    } finally {
      clearTimeout(timer);
    }
  }

  return sawQuota
    ? json({ error: 'live_voice_quota_exceeded', providerStatus: 429, providerStatuses }, 429)
    : json({ error: 'live_voice_unavailable', providerStatuses }, 424);
}

const pcmToWav = (pcm) => {
  // Unary Gemini TTS already returns WAV; never wrap it as raw PCM.
  if (pcm.length >= 12 && String.fromCharCode(...pcm.slice(0, 4)) === 'RIFF' && String.fromCharCode(...pcm.slice(8, 12)) === 'WAVE') return new Uint8Array(pcm).buffer;
  const output = new ArrayBuffer(44 + pcm.length);
  const view = new DataView(output);
  const bytes = new Uint8Array(output);
  const label = (offset, value) => { for (let i = 0; i < value.length; i += 1) bytes[offset + i] = value.charCodeAt(i); };
  label(0, 'RIFF'); view.setUint32(4, 36 + pcm.length, true); label(8, 'WAVE');
  label(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); view.setUint32(24, 24000, true);
  view.setUint32(28, 48000, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  label(36, 'data'); view.setUint32(40, pcm.length, true); bytes.set(pcm, 44);
  return output;
};

async function readJson(request) {
  const text = await request.text();
  if (new TextEncoder().encode(text).length > 32768) throw new Error('too_large');
  return JSON.parse(text);
}

async function chat(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  let body;
  try { body = await readJson(request); } catch { return json({ error: 'invalid_json' }, 400); }
  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 5000) : '';
  if (!message) return json({ error: 'message_required' }, 400);
  const language = languageFor(message, body?.language);
  const combinedServices = /service|সার্ভিস|সেবা/i.test(message) && /contact|hotline|phone|ফোন|যোগাযোগ|হটলাইন/i.test(message);
  const hasContactQuestion = /contact|hotline|phone|whatsapp|ফোন|যোগাযোগ|হটলাইন/i.test(message);
  const conversational = combinedServices || hasContactQuestion ? null : conversationReply(message, language);
  if (conversational) return json(conversational);
  const retrievedKnowledge = retrieveJelKnowledge(message);
  // Decisions belong to universities/embassies, not an agency. Handle these
  // safety-critical questions deterministically even if the free AI quota runs
  // out. This is a verified company policy, not a live immigration decision.
  const normalizedGuarantee = message.toLowerCase();
  if (/guarantee|guaranteed|100%|assured|শতভাগ|গ্যারান্টি|নিশ্চিত/.test(normalizedGuarantee)
      && /visa|admission|scholarship|university|student|ভিসা|ভর্তি|স্কলারশিপ|বিশ্ববিদ্যালয়|স্টুডেন্ট/.test(normalizedGuarantee)) {
    return json({
      reply: language === 'bn'
        ? 'না। কোনো এজেন্সি স্টুডেন্ট ভিসা, বিশ্ববিদ্যালয়ে ভর্তি বা স্কলারশিপ নিশ্চিত করতে পারে না। সংশ্লিষ্ট বিশ্ববিদ্যালয় ও ইমিগ্রেশন কর্তৃপক্ষই সিদ্ধান্ত দেয়। জার্নি এক্সপার্ট লিমিটেড আবেদন ও প্রয়োজনীয় কাগজপত্র প্রস্তুতিতে সহায়তা করতে পারে।'
        : 'No. Neither JEL nor any travel agency can guarantee visa approval, admission or scholarships. Final decisions belong to the relevant authorities. Journey Expert Limited can help with guidance and documentation.',
      language, mode:'verified', primaryIntent:'outcome_guarantee',
      groundingIds:['visa_assistance','study_abroad']
    });
  }
  // Stable company facts must be complete even when the model quota is exhausted.
  if (combinedServices) {
    const services = JEL_SEMANTIC_KNOWLEDGE.find(entry => entry.id === 'services_overview');
    return json({ reply: services[language], language, mode: 'verified', primaryIntent: 'services_overview', groundingIds: ['services_overview'] });
  }
  if (['company_directory', 'services_overview', 'brands'].includes(retrievedKnowledge.primary?.id)) return json({ ...fallback(language, message), language, mode: 'verified' });
  // The actual Pages Advanced Worker is the production chat service.
  // Use two free Workers AI models; one request may fail or produce the wrong
  // script even when the account binding is healthy.
  let workerFailure = 'ai_binding_not_configured';
  if (env.AI && typeof env.AI.run === 'function') {
    const langInstruction = language === 'bn'
      ? 'Answer ONLY in Bengali script (বাংলা). Give the answer directly.'
      : 'Answer ONLY in English. Give the answer directly.';
    const prior = Array.isArray(body?.history) ? body.history
      .filter(turn => turn && typeof turn.content === 'string')
      .slice(-6).map(turn => ({ role: turn.role === 'assistant' ? 'assistant' : 'user', content: turn.content.slice(0, 650) })) : [];
    const modelChoices = [
      '@cf/google/gemma-4-26b-a4b-it',
      '@cf/meta/llama-3.1-8b-instruct-fast',
    ];
    for (const modelName of modelChoices) {
      try {
        const aiReply = await Promise.race([
          env.AI.run(modelName, {
            messages: [
              { role: 'system', content: 'You are Angela, the Journey Expert Limited customer assistant in Dhaka, Bangladesh. ' +
                'Answer the exact question first, in 2 to 4 short, natural spoken sentences, without repetitive advertising. ' +
                'Use polite Bangladeshi Bengali (আপনি) when requested. ' +
                'Corporate facts must come ONLY from the supplied verified JEL context: never invent partners, licenses, university tie-ups, bookings, schedules or visa success rates. ' +
                'JEL supports air tickets, visa document guidance, tours, hotels, Hajj & Umrah, halal/medical tourism, insurance, corporate travel and Study Abroad. ' +
                'Office: 189/A Abdul Motin Complex, Nabisco Mor, Tejgaon, Dhaka. WhatsApp +8801926400400; Study Abroad: journeyexpertbd.com. ' +
                'When asked about travel/immigration/admission law, explain only general categories and tell the user to confirm current conditions with the official embassy, immigration authority or institution. Do not invent requirements, fees or deadlines. ' +
                'If you cannot verify a specific fact, say so rather than guessing. Never promise visas, admission, fares or inventory. ' +
                langInstruction + '\nVerified JEL context: ' + retrievedKnowledge.text.slice(0, 1800) },
              ...prior,
              { role: 'user', content: message.slice(0, 1300) },
            ],
            max_tokens: 360,
            temperature: 0.2,
            ...(modelName.includes('gemma-4') ? { chat_template_kwargs: { enable_thinking: false } } : {}),
          }),
          new Promise((_, reject) => setTimeout(() => reject(new Error('workers_ai_timeout')), 8500)),
        ]);
        const text = String(aiReply?.response || aiReply?.choices?.[0]?.message?.content || '').trim();
        const matchesLanguage = language === 'bn'
          ? /[\u0980-\u09FF]/.test(text)
          : !/[\u0980-\u09FF]/.test(text);
        if (text.length >= 12 && matchesLanguage) return json({
          reply: text.slice(0, 2000), language, mode: 'ai',
          providerModel: modelName, primaryIntent: retrievedKnowledge.primary?.id || 'general',
          groundingIds: retrievedKnowledge.ids,
        });
        workerFailure = 'wrong_language_or_empty_response';
      } catch (error) {
        const providerMessage = error instanceof Error ? error.message : String(error);
        workerFailure = /daily free|10,000 neurons|used up|quota|4006|3036/i.test(providerMessage)
          ? 'daily_free_quota_exceeded'
          : /timeout/i.test(providerMessage) ? 'ai_timeout' : 'ai_provider_error';
        console.warn('Angela Workers AI attempt failed', modelName, workerFailure);
        if (workerFailure === 'daily_free_quota_exceeded') break;
      }
    }
  }

  // When Workers AI exhausts its free daily neuron allocation, use JEL's
  // existing secret-bound Gemini Worker instead of repeating canned fallback.
  // The underlying Worker only returns mode 'ai' for actual model responses.
  try {
    const legacyController=new AbortController();
    const legacyTimer=setTimeout(()=>legacyController.abort(),13000);
    try {
      const upstream=await fetch('https://journey-expert-ltd-main.journeyexpertltd.workers.dev/api/ai-assistant',{
        method:'POST',signal:legacyController.signal,
        headers:{'content-type':'application/json','origin':'https://journeyexpertltd.com'},
        body:JSON.stringify({message,language,
          history:Array.isArray(body?.history)?body.history.slice(-8):[]})
      });
      if(upstream.ok){
        const answer=await upstream.json();
        const reply=typeof answer?.reply==='string'?answer.reply.trim().slice(0,2000):'';
        const matches=language==='bn'?/[\u0980-\u09FF]/.test(reply):!/[\u0980-\u09FF]/.test(reply);
        if(reply.length>12&&matches&&answer.mode==='ai')
          return json({reply,language,mode:'ai',
            providerModel:answer.providerModel||'gemini-3.5-flash-lite',
            primaryIntent:retrievedKnowledge.primary?.id||'general',
            groundingIds:retrievedKnowledge.ids});
      }
    }finally{clearTimeout(legacyTimer)}
  }catch(error){console.warn('Angela legacy Gemini chat unavailable',error instanceof Error?error.name:'unknown')}

  const key = (env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY || '').trim();
  if (!key) {
    const verified = retrievedKnowledge.primary ? fallback(language, message) : null;
    const quota = workerFailure === 'daily_free_quota_exceeded';
    const reply = verified ? verified.reply : quota
      ? (language === 'bn'
          ? 'আজ Cloudflare-এর ফ্রি AI ব্যবহারের সীমা পূর্ণ হয়েছে। এই মুহূর্তে নতুন তথ্য যাচাই না করে অনুমানভিত্তিক উত্তর দেব না। আপনার প্রশ্নটি আগামী দৈনিক বরাদ্দ নবায়নের পর আবার করুন, অথবা WhatsApp 01926400400-এ যোগাযোগ করুন।'
          : 'The daily free AI allowance has been exhausted. I will not guess at unverified facts. Please retry after the daily reset or contact WhatsApp 01926400400.')
      : (language === 'bn'
          ? 'AI সংযোগটি সাময়িকভাবে পাওয়া যাচ্ছে না। যাচাইকৃত কোম্পানির সেবা সম্পর্কে প্রশ্ন করুন অথবা WhatsApp 01926400400-এ যোগাযোগ করুন।'
          : 'The AI service is temporarily unavailable. Ask about verified JEL services or contact WhatsApp 01926400400.');
    return json({ reply, language, mode: verified ? 'verified' : 'ai_unavailable',
      reason: workerFailure, primaryIntent: verified?.primaryIntent || 'unverified',
      groundingIds: verified?.groundingIds || [], freeQuotaReset: quota ? '00:00_UTC' : undefined });
  }

  const system = `You are Angela, the official female AI Assistant of Journey Expert Ltd. (JEL), Bangladesh, on journeyexpertltd.com.
JEL verified knowledge has priority. Slogan: "Your Journey, Our Expertise." Office: 189/A (2nd Floor), Abdul Motin Complex, Hazi Moron Ali Road, Nabisco Mor, Tejgaon, Dhaka-1215, Bangladesh. WhatsApp/hotline: +8801926400400. Email: journeyexpertbd@gmail.com.
Core services: air ticketing and fare quotation, reissue/refund support, visa-document assistance, tours and travel, hotels, Hajj and Umrah, halal tourism, medical tourism, travel insurance, corporate travel management, Meet & Greet, and Study Abroad. Detailed education counselling is handled by JEL Study Abroad at journeyexpertbd.com.
Hajj & Umrah verified service scope: pilgrimage package planning, air travel coordination, Makkah/Madinah accommodation, ground transport, Ziyarat planning, pilgrim/group coordination, and visa/document guidance. Exact package inclusions, prices, availability, Saudi visa/permit/health requirements, quotas and dates are time-sensitive and must be verified before being presented as current.
If a query mentions Hajj or Umrah together with visa, hotel, flight, package, transport, Nusuk, permit, Makkah, Madinah or Ziyarat, treat Hajj/Umrah as the primary service context.
Answer only in ${language === 'bn' ? 'natural Bengali script' : 'professional English'}, matching the language explicitly selected in the interface.
Answer the user's actual question first. Keep normal spoken answers concise: 2-5 short sentences.
For JEL questions, use the verified facts above as the source of truth. Never invent company facts, partnerships, live fares, schedules, seats, hotel inventory, package availability, visa rules, fees, processing times, embassy decisions, admission results, scholarships, payments, bookings, or refunds.
You may answer general knowledge questions professionally. For current or time-sensitive public facts, only state them as current when Google Search grounding is actually enabled in this request; otherwise say the detail should be verified.
Never claim access to all of Google, Wikipedia, or the whole internet unless a search tool was actually used.
Do not request passport numbers, card/bank details, passwords, OTPs, or sensitive document contents.\n\nRETRIEVED VERIFIED JEL CONTEXT:\n${retrievedKnowledge.text}\n\nSTRICT SEMANTIC ACCURACY CONTRACT:\n- For JEL-specific facts, use only the retrieved verified context.\n- If the exact JEL-specific fact is absent, say it is not verified; do not fill the gap from model memory.\n- Answer the exact service/topic asked about; do not substitute a neighbouring intent.\n- Changing facts such as price, inventory, rules, fees, dates and processing times require current official/supplier verification.`;

  const history = Array.isArray(body?.history)
    ? body.history
        .filter((turn) => turn && typeof turn === 'object' && typeof turn.content === 'string' && turn.content.trim())
        .slice(-8)
        .map((turn) => ({ role: turn.role === 'assistant' ? 'model' : 'user', parts: [{ text: turn.content.trim().slice(0, 1800) }] }))
    : [];
  // Free-eligible Lite model first; never silently fall back to a paid tier.
  const model = 'gemini-3.5-flash-lite';
  let lastProviderStatus = 0;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 11000);
  try {
    const requestBody = {
      systemInstruction: { parts: [{ text: system }] },
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
      generationConfig: { maxOutputTokens: 900 },
    };
    const groundingEnabled = env.GOOGLE_SEARCH_GROUNDING === 'true';
    if (groundingEnabled) requestBody.tools = [{ google_search: {} }];
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      signal: controller.signal,
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(requestBody),
    });
    lastProviderStatus = upstream.status;
    if (upstream.ok) {
      const data = await upstream.json();
      const candidate = data?.candidates?.[0];
      const reply = candidate?.content?.parts?.filter((part) => !part.thought).map((part) => part.text || '').join('').trim();
      if (reply && candidate.finishReason !== 'MAX_TOKENS' && !(language === 'bn' && !/[\u0980-\u09FF]/.test(reply)) && !(language === 'en' && /[\u0980-\u09FF]/.test(reply))) {
        return json({ reply, language, mode: 'ai', providerModel: model, grounded: Boolean(candidate?.groundingMetadata), groundingEnabled, primaryIntent: retrievedKnowledge.primary?.id || 'unverified', groundingIds: retrievedKnowledge.ids });
      }
    }
  } catch {
    // Bounded Gemini failure falls through to verified JEL fallback.
  } finally {
    clearTimeout(timer);
  }
  // Do not mistake an upstream outage or free-tier limit for an answered question.
  return json({ reply: language === 'bn' ? 'এই মুহূর্তে AI থেকে আপনার নির্দিষ্ট প্রশ্নের উত্তর আসেনি। কিছুক্ষণ পর আবার চেষ্টা করুন, অথবা WhatsApp 01926400400-এ যোগাযোগ করুন।' : 'The AI service could not answer your question right now. Please retry shortly or contact WhatsApp 01926400400.', language, mode: 'ai_unavailable', reason: lastProviderStatus === 429 ? 'quota' : [401,403].includes(lastProviderStatus) ? 'credential' : lastProviderStatus ? 'provider_http_' + lastProviderStatus : 'provider_timeout' });
}

async function transcribe(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const origin = request.headers.get('origin');
  if (origin && origin !== ALLOWED_ORIGIN && origin !== new URL(request.url).origin) return json({ error: 'origin_not_allowed' }, 403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({ error: 'json_required' }, 415);

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > 3_600_000) return json({ error: 'audio_too_large' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'invalid_json' }, 400); }
  const audio = typeof body?.audio === 'string' ? body.audio.trim() : '';
  const language = body?.language === 'en' ? 'en' : 'bn';
  const mimeTypeRaw = typeof body?.mimeType === 'string' ? body.mimeType : 'audio/webm';
  const mimeType = mimeTypeRaw.split(';')[0].toLowerCase();
  if (!audio) return json({ error: 'audio_required' }, 400);
  if (!/^audio\/(webm|wav|mpeg|mp3|ogg|opus|aac|flac|m4a|mp4)$/i.test(mimeType)) return json({ error: 'audio_type_not_supported' }, 415);

  // Accept Bengali/Banglish transcripts: Whisper may romanize Bengali speech.
  // The chat UI retains the selected language independently of transcription.
  let speechFailure = 'speech_provider_unavailable';
  if (env.AI && typeof env.AI.run === 'function') {
    try {
      const detected = await Promise.race([
        env.AI.run('@cf/openai/whisper-large-v3-turbo', {
          audio,
          task: 'transcribe',
          language: language === 'bn' ? 'bn' : 'en',
          initial_prompt: 'Journey Expert Limited, Angela, Bangla, visa, tickets and study abroad.',
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('whisper_timeout')), 14000)),
      ]);
      const text = String(detected?.text || '').trim().replace(/^["'\s]+|["'\s]+$/g, '');
      if (text.length > 2 && !/^\[?(?:music|silence|no speech|background noise)\]?$/i.test(text)) {
        return json({transcript: text.slice(0, 1200), language, mode: 'ai', providerModel: 'cloudflare-whisper-large-v3-turbo'});
      }
      speechFailure = 'whisper_empty';
    } catch (error) {
      speechFailure = error instanceof Error && /timeout/i.test(error.message) ? 'whisper_timeout' : 'whisper_provider_error';
      console.warn('Angela Whisper v3 transcription failed', speechFailure);
    }

    // An independently implemented speech model can recover from a format or
    // language problem in Whisper v3. Constrain the array to small voice clips.
    if (audio.length < 500000) {
      try {
        const bytes = Uint8Array.from(atob(audio), c => c.charCodeAt(0));
        const backup = await Promise.race([
          env.AI.run('@cf/openai/whisper', {audio: Array.from(bytes)}),
          new Promise((_, reject) => setTimeout(() => reject(new Error('whisper_backup_timeout')), 12000)),
        ]);
        const text = String(backup?.text || '').trim();
        if (text.length > 2) return json({transcript: text.slice(0,1200), language, mode: 'ai', providerModel: 'cloudflare-whisper-backup'});
        speechFailure = 'speech_empty';
      } catch (error) {
        console.warn('Angela backup Whisper unavailable', error instanceof Error ? error.message.slice(0,80) : 'unknown');
        speechFailure = 'speech_provider_unavailable';
      }
    }
  }

  const keys = [...new Set([env.GEMINI_API_KEY, env.GEMINI_TTS_API_KEY].map((value) => String(value || '').trim()).filter(Boolean))];
  if (!keys.length) return json({ error: 'transcription_unavailable', reason: speechFailure }, 503);

  const prompt = language === 'bn'
    ? 'Transcribe this customer speech accurately. The customer is using Bangla or Banglish. Return only the transcript in natural Bengali script, preserving proper names and brand names such as Journey Expert, JEL, visa, ticket, university and country names when appropriate. Do not answer the question and do not add commentary.'
    : 'Transcribe this customer speech accurately in English. Return only the transcript. Do not answer the question and do not add commentary.';

  const models = ['gemini-3.8-flash', 'gemini-3.5-flash', 'gemini-2.5-flash'];
  for (const model of models) {
    for (const key of keys) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      try {
        const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
          body: JSON.stringify({
            contents: [{
              role: 'user',
              parts: [
                { text: prompt },
                { inlineData: { mimeType, data: audio } },
              ],
            }],
            generationConfig: { temperature: 0, maxOutputTokens: 256 },
          }),
        });
        if (!upstream.ok) continue;
        const data = await upstream.json();
        const transcript = data?.candidates?.[0]?.content?.parts
          ?.filter((part) => !part.thought && typeof part.text === 'string')
          .map((part) => part.text)
          .join('')
          .replace(/^[\"'\s]+|[\"'\s]+$/g, '')
          .trim();
        if (!transcript) continue;
        if (language === 'bn' && !/[\u0980-\u09FF]/.test(transcript)) continue;
        if (language === 'en' && /[\u0980-\u09FF]/.test(transcript)) continue;
        return json({ transcript: transcript.slice(0, 1200), language, mode: 'ai', providerModel: model });
      } catch {
        // Try the next configured model/key.
      } finally {
        clearTimeout(timer);
      }
    }
  }

  return json({ error: 'transcription_unavailable' }, 503);
}

// Cloudflare-hosted Aura-1 is eligible for this account's daily free Workers AI
// allocation. It speaks English; for Bengali without Gemini Aoede, a short
// romanized-Banglish approximation is used, never mislabeled as native Bengali.
// English-only free TTS. Never transliterate Bangla for an English voice:
// that path produced incorrect Bengali phonemes and silently cut replies.
// Bengali speech must use genuine Bengali TTS or a device's verified bn female voice.
async function freeFemaleSpeech(text, env) {
  if (!env.AI || typeof env.AI.run !== 'function') return null;
  if (/[\u0980-\u09FF]/.test(text)) return null;
  const spoken = text
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/[\r\n*#`_]+/g, ' ')
    .replace(/\s+/g, ' ').trim().slice(0, 1100);
  if (!spoken) return null;
  try {
    const raw = await Promise.race([
      env.AI.run('@cf/deepgram/aura-1', {
        text: spoken, speaker: 'athena',
        encoding: 'linear16', container: 'wav'
      }, { returnRawResponse: true }),
      new Promise((_, reject) => setTimeout(() => reject(new Error('aura_timeout')), 16000))
    ]);
    if (!(raw instanceof Response) || !raw.ok) return null;
    const bytes = new Uint8Array(await raw.arrayBuffer());
    if (bytes.length < 100
        || String.fromCharCode(...bytes.subarray(0,4)) !== 'RIFF'
        || String.fromCharCode(...bytes.subarray(8,12)) !== 'WAVE') return null;
    return new Response(bytes, {headers: {
      'content-type': 'audio/wav',
      'cache-control': 'no-store',
      'x-angela-voice': 'Athena',
      'x-angela-voice-model': 'cloudflare-aura-1-free',
      'x-angela-voice-mode': 'english-female-full-reply',
      'x-angela-spoken-chars': String(spoken.length),
      'access-control-allow-origin': ALLOWED_ORIGIN,
      'x-content-type-options': 'nosniff',
    }});
  } catch(err) {
    console.warn('English free TTS unavailable',err instanceof Error?err.message:'unknown');
    return null;
  }
}

// Server-side proxy to the already configured, secret-bound JEL Worker.
// The Gemini API key never enters the browser or GitHub. This restores
// native Bengali female speech when Pages itself lacks that secret.
async function getNativeAngelaSpeech(text) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 21500);
  try {
    const response = await fetch(
      'https://journey-expert-ltd-main.journeyexpertltd.workers.dev/api/angela/native-tts', {
      method: 'POST', signal: controller.signal,
      headers: {'content-type': 'application/json','origin':'https://journeyexpertltd.com'},
      body: JSON.stringify({text})
    });
    if (!response.ok) {
      console.warn('Native Aoede proxy HTTP status', response.status);
      if (response.status === 429) {
        return new Response(JSON.stringify({error:'voice_quota_exceeded'}),{
          status:429,headers:{'content-type':'application/json','retry-after':'60','cache-control':'no-store'}
        });
      }
      return null;
    }
    if (!response.headers.get('content-type')?.includes('audio/wav')) return null;
    const wav = new Uint8Array(await response.arrayBuffer());
    if (wav.length < 1200 || String.fromCharCode(...wav.subarray(0,4)) !== 'RIFF'
      || String.fromCharCode(...wav.subarray(8,12)) !== 'WAVE') return null;
    return new Response(wav,{status:200,headers:{
      'content-type':'audio/wav','cache-control':'no-store',
      'access-control-allow-origin':ALLOWED_ORIGIN,
      'x-content-type-options':'nosniff',
      'x-angela-voice':response.headers.get('x-angela-voice')||'Aoede',
      'x-angela-voice-mode':response.headers.get('x-angela-voice-mode')||'native-bengali-female',
      'x-angela-voice-model':response.headers.get('x-angela-voice-model')||'gemini-3.8-flash-lite-tts'
    }});
  } catch (error) {
    console.warn('Angela native Bengali proxy unavailable',error instanceof Error?error.name:'unknown');
    return null;
  } finally {clearTimeout(timer);}
}

async function speech(request, env) {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  let body;
  try { body = await readJson(request); } catch { return json({ error: 'invalid_json' }, 400); }

  const text = typeof body?.text === 'string' ? body.text.replace(/\s+/g, ' ').trim().slice(0, 1200) : '';
  if (!text) return json({ error: 'text_required' }, 400);

  if (env.ANGELA_SERVER_VOICE !== 'off') {
    const native = await getNativeAngelaSpeech(text);
    if (native) return native;
  }

  const keys = [...new Set([
    String(env.GEMINI_TTS_API_KEY || '').trim(),
    String(env.GEMINI_API_KEY || '').trim(),
  ].filter(Boolean))];
  if (env.ANGELA_SERVER_VOICE === 'off') return json({ error: 'voice_disabled_by_admin' }, 503);
  if (!keys.length) {
    const freeVoice = await freeFemaleSpeech(text, env);
    if (freeVoice) return freeVoice;
    const bengali = /[\u0980-\u09FF]/.test(text);
    return json({ error: bengali ? 'native_bengali_voice_required' : 'female_voice_unavailable',
      detail: bengali ? 'English-only phonetic Banglish TTS disabled due to incorrect pronunciation. Use a Bengali female device voice or native Bengali TTS.' : 'English female TTS unavailable', diagnostic: 'missing_runtime_gemini_key' }, bengali ? 422 : 503);
  }

  // Both listed Gemini speech models have a documented free tier. The first
  // uses the Interactions API; the second requires generateContent. Read the
  // real output_audio/inlineData fields, rather than obsolete steps[].content.
  const models = ['gemini-3.8-flash-lite-tts', 'gemini-3.8-flash-tts'];
  let sawQuota = false;
  let lastProviderStatus = 0;
  const deadline = Date.now() + 17500;

  nativeTts: for (const key of keys) {
    for (const model of models) {
      const remaining = deadline - Date.now();
      if (remaining < 1600) break nativeTts;
      // Gemini 3.8 Interactions requires an array of user_input content
      // blocks; raw input strings caused invalid-request failures. Put
      // delivery notes in speech_metadata, never in the words to speak.
      const nativeBangla = /[\u0980-\u09FF]/.test(text);
      const deliveryStyle = nativeBangla
        ? 'Speak the supplied Bangla exactly in natural Bangladeshi Bengali (bn-BD), with a warm adult female voice, accurate pronunciation, natural pauses and a moderate conversational pace. Do not translate, romanize, add, or omit words.'
        : 'Read the supplied English text exactly, in a warm adult female voice with natural pacing, clear consonants and comfortable pauses. Do not add or omit words.';
      const payload = {
        model,
        input: [{
          type: 'user_input',
          content: [{type: 'text', text, annotations: [{
            type: 'speech_metadata', style: deliveryStyle
          }]}],
        }],
        response_format: { type: 'audio' },
        generation_config: { speech_config: [{ voice: 'Aoede' }] },
      };
      const route = 'https://generativelanguage.googleapis.com/v1beta/interactions';
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), Math.min(model === models[0] ? 10500 : 6500, remaining));
      try {
        const upstream = await fetch(route, {
          method: 'POST', signal: controller.signal,
          headers: {'Content-Type':'application/json','x-goog-api-key':key},
          body: JSON.stringify(payload),
        });
        lastProviderStatus = upstream.status;
        if (!upstream.ok) {
          if (upstream.status === 429) { sawQuota = true; break; }
          if (upstream.status === 401 || upstream.status === 403) break;
          continue;
        }
        const data = await upstream.json();
        const direct = data?.output_audio?.data;
        const other = data?.steps?.flatMap(step => step.content || [])
          .find(part => part.type === 'audio' && typeof part.data === 'string')?.data;
        const candidate = data?.candidates?.[0]?.content?.parts
          ?.find(part => part?.inlineData?.mimeType?.startsWith('audio/') || part?.inline_data?.mime_type?.startsWith('audio/'));
        const encoded = direct || other || candidate?.inlineData?.data || candidate?.inline_data?.data;
        if (typeof encoded !== 'string' || !encoded.length) continue;
        const pcm = Uint8Array.from(atob(encoded), letter => letter.charCodeAt(0));
        if (pcm.length < 100) continue;
        const isWav = pcm.length > 12 &&
          String.fromCharCode(...pcm.slice(0,4)) === 'RIFF' &&
          String.fromCharCode(...pcm.slice(8,12)) === 'WAVE';
        const output = isWav ? pcm : new Uint8Array(pcmToWav(pcm));
        return new Response(output, {headers: {
          'content-type':'audio/wav', 'cache-control':'no-store',
          'access-control-allow-origin':ALLOWED_ORIGIN,
          'x-content-type-options':'nosniff',
          'x-angela-voice':'Aoede',
          'x-angela-voice-mode':/[\u0980-\u09FF]/.test(text) ? 'native-bengali-female' : 'english-female',
          'x-angela-voice-model':model,
        }});
      } catch (error) {
        console.warn('Native female TTS retry', model, controller.signal.aborted ? 'timeout' : (error instanceof Error ? error.name : 'unavailable'));
      } finally {
        clearTimeout(timer);
      }
    }
  }

  if (sawQuota) {
    return new Response(JSON.stringify({ error: 'voice_quota_exceeded', providerStatus: lastProviderStatus || 429 }), {
      status: 429,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store',
        'access-control-allow-origin': ALLOWED_ORIGIN,
        'x-content-type-options': 'nosniff',
        'retry-after': '60',
      },
    });
  }

  const freeVoice = await freeFemaleSpeech(text, env);
  if (freeVoice) return freeVoice;
  const bengali = /[\u0980-\u09FF]/.test(text);
  return json({ error: bengali ? 'native_bengali_voice_required' : 'female_voice_unavailable',
    providerStatus: lastProviderStatus || undefined,
    diagnostic: lastProviderStatus === 400 ? 'gemini_request_rejected' :
      lastProviderStatus === 403 ? 'gemini_key_denied' :
      lastProviderStatus === 404 ? 'gemini_model_unavailable' :
      lastProviderStatus === 429 ? 'gemini_free_quota' :
      lastProviderStatus ? 'gemini_provider_' + lastProviderStatus : 'gemini_transport_or_timeout',
    }, bengali ? 422 : 503);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/angela/meta-webhook') return JELMetaWebhook.onRequest({ request, env, chatHandler: ({request, env}) => chat(request, env) });
    if (request.method === 'OPTIONS' && url.pathname.startsWith('/api/')) return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': ALLOWED_ORIGIN,
        'access-control-allow-methods': 'GET,POST,OPTIONS',
        'access-control-allow-headers': 'Content-Type',
      },
    });
    if (url.pathname === '/angela/health') return json({ app: 'Journey Expert Angela', routeMarker: 'jel-ltd-angela-health-20261010', status: 'advanced-worker-reachable', chatModel: 'gemini-3.5-flash-lite', geminiCredentialBound: Boolean(String(env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY || '').trim()), workersAiBound: Boolean(env.AI && typeof env.AI.run === 'function'), nativeTtsModel: 'gemini-3.8-flash-lite-tts' });
    if (url.pathname === '/angela/chat') return chat(request, env);
    if (url.pathname === '/angela/transcribe') return transcribe(request, env);
    if (url.pathname === '/angela/speech') return speech(request, env);
    if (url.pathname === '/angela/live-token') return liveToken(request, env);
    if (url.pathname === '/api/ai/voice-agent' || url.pathname === '/api/ai-assistant') {
      const action = url.searchParams.get('action');
      if (action === 'speech') return speech(request, env);
      if (action === 'live-token') return liveToken(request, env);
      return chat(request, env);
    }
    if (url.pathname === '/api/voice/gemini') return speech(request, env);
    if (url.pathname === '/api/gemini/live-token') return liveToken(request, env);
    if (url.pathname === '/api/health' || url.pathname === '/api/healthz') return json({
      status: 'online',
      service: 'JEL Angela Pages Worker',
      languages: ['bn', 'en'],
      femaleVoiceConfigured: Boolean(env.GEMINI_TTS_API_KEY || env.GEMINI_API_KEY),
      femaleLiveFallbackConfigured: Boolean(env.GEMINI_API_KEY || env.GEMINI_TTS_API_KEY),
      liveFemaleVoiceConfigured: Boolean(env.GEMINI_API_KEY),
      model: 'gemini-3.5-flash-lite',
      googleSearchGrounding: env.GOOGLE_SEARCH_GROUNDING === 'true',
    });
    return env.ASSETS.fetch(request);
  },
};

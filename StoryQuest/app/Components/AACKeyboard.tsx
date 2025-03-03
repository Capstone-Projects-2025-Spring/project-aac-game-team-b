import React from "react";
import * as motion from "motion/react-client";

 interface AACKeyboardProps {
   onSelect: (word: string) => void; // Function to send selected word back
   symbols: { word: string; image: string }[];//required symbols now
 }



 const AACKeyboard: React.FC<AACKeyboardProps> = ({ onSelect, symbols }) => {
   return (
     <div className="bg-gray-600 p-4 border border-gray-900 rounded-lg shadow-md border-spacing-96">
       <h3 className="text-lg font-bold mb-2 text-center">AAC Keyboard</h3>
       <div className="grid grid-cols-3 gap-4">
         {symbols.map((symbol) => (
           <motion.button
             key={symbol.word}
             whileHover={{ scale: 1.2 }}
             whileTap={{ scale: 0.9 }}
             className="p-2 bg-blue-500 text-white rounded flex flex-col items-center"
             onClick={() => onSelect(symbol.word)}
           >
             <img src={symbol.image} alt={symbol.word} className="w-16 h-16 mb-2" />
             {symbol.word}
           </motion.button>
         ))}
       </div>
     </div>
   );
 };

 export default AACKeyboard;
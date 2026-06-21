const statusStyles = {
  may_qualify: "border-green-500 bg-green-50 text-green-800",
  unlikely: "border-gray-500 bg-gray-50 text-gray-800",
  need_more_info: "border-blue-500 bg-blue-50 text-blue-800",
  refer_to_human: "border-amber-500 bg-amber-50 text-amber-900"
};

export const EligibilityCard = ({ data }) => {
  return (
    <div className={`p-4 border-l-4 rounded-lg shadow-sm ${statusStyles[data.eligibility_status]}`}>
      <h3 className="font-bold text-lg mb-2">Eligibility Status: {data.eligibility_status.replace('_', ' ')}</h3>
      <p className="mb-4">{data.reply}</p>
      
      <details className="group">
        <summary className="font-semibold cursor-pointer">Why BEACON thinks this</summary>
        <ul className="list-disc pl-5 mt-2">
          {data.reasons.map((reason, idx) => <li key={idx}>{reason}</li>)}
        </ul>
      </details>
      
      <div className="mt-4 pt-4 border-t border-current/20">
        <p className="text-sm italic">Source: {data.source}</p>
      </div>
    </div>
  );
};
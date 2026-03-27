import React from 'react';
import comparisonLibrary from '../../../public/comparison_data.json';

const ComparisonTable = ({ id }: { id: string }) => {
  // Type-safe library item finding
  const libraryItem = comparisonLibrary.comparision_library.find(
    (item: { id: string }) => item.id === id
  );

  if (!libraryItem || !libraryItem.comparison_table) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <p className="text-slate-600">Comparison data not available</p>
      </div>
    );
  }

  // Extract product name for reuse
  const competitorName = libraryItem.product?.name || 'Competitor';

  return (
    <div className="max-w-4xl mx-auto py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Get so much more with Crabs HQ</h2>
        <p className="text-lg text-slate-600 max-w-2xl">
          CrabsHQ  has everything you need, from task tracking to templates to documentation.
          Get comfortable — you won't be leaving all that often.
        </p>
      </div>

      <div className="overflow-hidden shadow-lg rounded-lg border border-slate-200">
        <table className="w-full text-sm bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b">Features</th>
              <th className="px-6 py-4 text-center font-semibold text-slate-700 border-b w-1/4">
                {competitorName}
              </th>
              <th className="px-6 py-4 text-center font-semibold text-slate-700 border-b w-1/4 bg-red-50">
                Crabs HQ
              </th>
            </tr>
          </thead>
          <tbody>
            {libraryItem.comparison_table.map((item: any, index: number) => {
              const competitorHasFeature = item.feature_value[competitorName] || false;
              const crabsHQHasFeature = item.feature_value["CrabsHQ"] || item.feature_value["Notion"] || false;

              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 border-b border-slate-200">
                    {item.feature}
                  </td>
                  <td className="px-6 py-4 text-center border-b border-slate-200">
                    {competitorHasFeature ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 text-slate-600 rounded-md">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 text-slate-400 rounded-md">
                        ✕
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center border-b border-slate-200 bg-red-50">
                    {crabsHQHasFeature ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-red-700 text-white rounded-md">
                        ✓
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-200 text-slate-400 rounded-md">
                        ✕
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">
          * Features may vary based on plan selection and updates
        </p>
      </div>
    </div>
  );
};

export default ComparisonTable;
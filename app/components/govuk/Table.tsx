import type { CommonProps, TextOrHtml } from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type TableCell = CommonProps &
  TextOrHtml & {
    format?: string;
    colspan?: number;
    rowspan?: number;
  };

export type TableProps = CommonProps & {
  rows: TableCell[][];
  head?: TableCell[];
  caption?: string;
  captionClasses?: string;
  firstCellIsHeader?: boolean;
};

function cellClasses(cell: TableCell, base: string, withFormat: boolean) {
  let name = base;
  if (withFormat && cell.format) name += ` ${base}--${cell.format}`;
  if (cell.classes) name += ` ${cell.classes}`;
  return name;
}

export default function Table({
  classes,
  attributes,
  rows,
  head,
  caption,
  captionClasses,
  firstCellIsHeader,
}: TableProps) {
  return (
    <table
      className={govukClasses("govuk-table", classes)}
      {...attributes}
    >
      {caption && (
        <caption className={govukClasses("govuk-table__caption", captionClasses)}>
          {caption}
        </caption>
      )}
      {head && (
        <thead className="govuk-table__head">
          <tr className="govuk-table__row">
            {head.map((item, index) => (
              <th
                key={index}
                scope="col"
                className={cellClasses(item, "govuk-table__header", true)}
                colSpan={item.colspan}
                rowSpan={item.rowspan}
                {...item.attributes}
              >
                {item.html ?? item.text}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className="govuk-table__body">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="govuk-table__row">
            {row.map((cell, cellIndex) => {
              if (firstCellIsHeader && cellIndex === 0) {
                return (
                  <th
                    key={cellIndex}
                    scope="row"
                    className={cellClasses(cell, "govuk-table__header", false)}
                    colSpan={cell.colspan}
                    rowSpan={cell.rowspan}
                    {...cell.attributes}
                  >
                    {cell.html ?? cell.text}
                  </th>
                );
              }
              return (
                <td
                  key={cellIndex}
                  className={cellClasses(cell, "govuk-table__cell", true)}
                  colSpan={cell.colspan}
                  rowSpan={cell.rowspan}
                  {...cell.attributes}
                >
                  {cell.html ?? cell.text}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

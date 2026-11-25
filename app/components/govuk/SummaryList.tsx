import type {
  CommonProps,
  CommonPropsTextOrHtml,
  TextOrHtml,
} from "@/app/components/govuk/types";
import { govukClasses } from "@/app/components/govuk/utils";

export type SummaryListAction = CommonPropsTextOrHtml & {
  href: string;
  visuallyHiddenText?: string;
};

export type SummaryListValue = TextOrHtml & {
  classes?: string;
};

export type SummaryListRow = {
  key: SummaryListValue;
  value: SummaryListValue;
  actions?: {
    items: SummaryListAction[];
    classes?: string;
  };
  classes?: string;
};

export type SummaryListCardTitle = TextOrHtml & {
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  classes?: string;
};

export type SummaryListCard = CommonProps & {
  title?: SummaryListCardTitle;
  actions?: {
    items: SummaryListAction[];
    classes?: string;
  };
};

export type SummaryListProps = CommonProps & {
  rows: SummaryListRow[];
  card?: SummaryListCard;
};

function rowHasActions(row: SummaryListRow) {
  return Boolean(row.actions && row.actions.items.length > 0);
}

function ActionLink({
  action,
  cardTitle,
}: {
  action: SummaryListAction;
  cardTitle?: SummaryListCardTitle;
}) {
  return (
    <a
      className={govukClasses("govuk-link", action.classes)}
      href={action.href}
      {...action.attributes}
    >
      {action.html ?? action.text}
      {(action.visuallyHiddenText || cardTitle) && (
        <span className="govuk-visually-hidden">
          {action.visuallyHiddenText ? ` ${action.visuallyHiddenText}` : null}
          {cardTitle ? ` (${cardTitle.html ?? cardTitle.text})` : null}
        </span>
      )}
    </a>
  );
}

function RowActions({
  actions,
  cardTitle,
}: {
  actions: NonNullable<SummaryListRow["actions"]>;
  cardTitle?: SummaryListCardTitle;
}) {
  if (actions.items.length === 1) {
    return (
      <dd className={govukClasses("govuk-summary-list__actions", actions.classes)}>
        <ActionLink action={actions.items[0]} cardTitle={cardTitle} />
      </dd>
    );
  }
  return (
    <dd className={govukClasses("govuk-summary-list__actions", actions.classes)}>
      <ul className="govuk-summary-list__actions-list">
        {actions.items.map((action, index) => (
          <li key={index} className="govuk-summary-list__actions-list-item">
            <ActionLink action={action} cardTitle={cardTitle} />
          </li>
        ))}
      </ul>
    </dd>
  );
}

function CardActions({
  actions,
  cardTitle,
}: {
  actions: NonNullable<SummaryListCard["actions"]>;
  cardTitle?: SummaryListCardTitle;
}) {
  if (actions.items.length === 1) {
    return (
      <div className={govukClasses("govuk-summary-card__actions", actions.classes)}>
        <ActionLink action={actions.items[0]} cardTitle={cardTitle} />
      </div>
    );
  }
  return (
    <ul className={govukClasses("govuk-summary-card__actions", actions.classes)}>
      {actions.items.map((action, index) => (
        <li key={index} className="govuk-summary-card__action">
          <ActionLink action={action} cardTitle={cardTitle} />
        </li>
      ))}
    </ul>
  );
}

export default function SummaryList({
  classes,
  attributes,
  rows,
  card,
}: SummaryListProps) {
  const anyRowHasActions = rows.some(rowHasActions);

  const list = (
    <dl
      className={govukClasses("govuk-summary-list", classes)}
      {...attributes}
    >
      {rows.map((row, index) => {
        let rowClasses = "govuk-summary-list__row";
        if (anyRowHasActions && !rowHasActions(row)) {
          rowClasses += " govuk-summary-list__row--no-actions";
        }
        if (row.classes) rowClasses += ` ${row.classes}`;
        return (
          <div key={index} className={rowClasses}>
            <dt className={govukClasses("govuk-summary-list__key", row.key.classes)}>
              {row.key.html ?? row.key.text}
            </dt>
            <dd className={govukClasses("govuk-summary-list__value", row.value.classes)}>
              {row.value.html ?? row.value.text}
            </dd>
            {rowHasActions(row) && (
              <RowActions actions={row.actions} cardTitle={card?.title} />
            )}
          </div>
        );
      })}
    </dl>
  );

  if (!card) {
    return list;
  }

  const headingLevel = card.title?.headingLevel ?? 2;
  const CardTitle = `h${headingLevel}` as const;

  return (
    <div
      className={govukClasses("govuk-summary-card", card.classes)}
      {...card.attributes}
    >
      <div className="govuk-summary-card__title-wrapper">
        {card.title && (
          <CardTitle
            className={govukClasses("govuk-summary-card__title", card.title.classes)}
          >
            {card.title.html ?? card.title.text}
          </CardTitle>
        )}
        {card.actions && card.actions.items.length > 0 && (
          <CardActions actions={card.actions} cardTitle={card.title} />
        )}
      </div>
      <div className="govuk-summary-card__content">{list}</div>
    </div>
  );
}

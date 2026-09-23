import { LoadingPanel } from '@/components/common/LoadingPanel';
import { useDateRange, useMessages } from '@/components/hooks';
import { useEventStatsQuery } from '@/components/hooks/queries/useEventStatsQuery';
import { MetricCard } from '@/components/metrics/MetricCard';
import { MetricsBar } from '@/components/metrics/MetricsBar';
import { formatLongNumber } from '@/lib/format';

export function EventsMetricsBar({ websiteId }: { websiteId: string }) {
  const { isAllTime } = useDateRange();
  const { t, labels, getErrorMessage } = useMessages();
  const { data, isLoading, isFetching, error } = useEventStatsQuery({
    websiteId,
  });

  const { events, visitors, visits, uniqueEvents, comparison } = data || {};

  const metrics = data
    ? [
        {
          value: visitors ?? 0,
          label: t(labels.visitors),
          change: (visitors ?? 0) - (comparison?.visitors ?? 0),
          formatValue: formatLongNumber,
        },
        {
          value: visits ?? 0,
          label: t(labels.visits),
          change: (visits ?? 0) - (comparison?.visits ?? 0),
          formatValue: formatLongNumber,
        },
        {
          value: events ?? 0,
          label: t(labels.events),
          change: (events ?? 0) - (comparison?.events ?? 0),
          formatValue: formatLongNumber,
        },
        {
          value: uniqueEvents ?? 0,
          label: t(labels.uniqueEvents),
          change: (uniqueEvents ?? 0) - (comparison?.uniqueEvents ?? 0),
          formatValue: formatLongNumber,
        },
      ]
    : null;

  return (
    <LoadingPanel
      data={metrics}
      isLoading={isLoading}
      isFetching={isFetching}
      error={getErrorMessage(error)}
      minHeight="136px"
    >
      <MetricsBar>
        {metrics?.map(({ label, value, change, formatValue }) => {
          return (
            <MetricCard
              key={label}
              value={value}
              label={label}
              change={change}
              formatValue={formatValue}
              showChange={!isAllTime}
            />
          );
        })}
      </MetricsBar>
    </LoadingPanel>
  );
}

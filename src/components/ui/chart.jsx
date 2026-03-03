"use client"

import * as React from "react"
import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
} from "react"
import {
  Area,
  Bar,
  Cell,
  Label,
  LabelList,
  Line,
  Pie,
  PolarGrid,
  RadialBar,
  Rectangle,
  Sector,
  Text as RechartsText,
  XAxis,
  YAxis,
} from "recharts"
import { tv } from "tailwind-variants"

import { cn } from "@/lib/utils"

// Helper to type and forward props
const typedForwardRef = (
  Component
) => forwardRef(Component)

// Chart Components
const CHART_STYLES = {
  container: "relative",
  error: "absolute inset-0 flex items-center justify-center",
  errorMessage:
    "rounded-lg border bg-background p-2 text-sm text-muted-foreground shadow-sm",
  legend: "flex items-center justify-end gap-4",
  legendItem: "flex items-center gap-2",
  legendIcon: "h-3 w-3 shrink-0 rounded-sm",
}

const Chart = typedForwardRef((props, ref) => {
  const {
    className,
    children,
    error,
    errorMessage = "Couldn't load chart",
    ...rest
  } = props

  return (
    <div ref={ref} className={cn(CHART_STYLES.container, className)} {...rest}>
      {children}
      {error && (
        <div className={CHART_STYLES.error}>
          <div className={CHART_STYLES.errorMessage}>{errorMessage}</div>
        </div>
      )}
    </div>
  )
})
Chart.displayName = "Chart"

// Context
const ChartContext = createContext(null)

function useChart() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

const ChartContainer = typedForwardRef(
  (
    {
      className,
      children,
      config,
      error,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const id = useId()
    const containerId = `chart-container-${id}`

    const contextValue = useMemo(
      () => ({
        config: config ?? {},
      }),
      [config]
    )

    return (
      <ChartContext.Provider value={contextValue}>
        <Chart
          ref={ref}
          id={containerId}
          className={className}
          error={error}
          errorMessage={errorMessage}
          {...props}
        >
          {children}
        </Chart>
      </ChartContext.Provider>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

// Tooltip
const chartTooltipVariants = tv({
  base: [
    "recharts-tooltip-wrapper",
    "z-50",
    "grid",
    "min-w-[8rem]",
    "gap-1",
    "rounded-lg",
    "border",
    "bg-background/95",
    "p-2",
    "text-sm",
    "shadow-lg",
    "backdrop-blur-lg",
    "transition-transform",
    "animate-in",
    "fade-in-0",
    "zoom-in-95",
  ],
  variants: {
    side: {
      top: "data-[side=top]:slide-in-from-bottom-2",
      bottom: "data-[side=bottom]:slide-in-from-top-2",
      left: "data-[side=left]:slide-in-from-right-2",
      right: "data-[side=right]:slide-in-from-left-2",
    },
  },
})

const ChartTooltip = typedForwardRef(
  ({ className, side, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(chartTooltipVariants({ side }), className)}
      {...props}
    />
  )
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = typedForwardRef(
  (
    {
      className,
      label,
      hideLabel,
      indicator = "dot",
      ...props
    },
    ref
  ) => {
    const { config } = useChart()

    const itemContent =
      "payload" in props &&
      props.payload &&
      props.payload.length > 0 &&
      props.payload.map((item, index) => {
        const { name, value, color } = item
        const configEntry = config[name]

        return (
          <div
            key={`tooltip-item-${index}`}
            className="flex items-center gap-2"
          >
            {indicator === "dot" && (
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: color,
                }}
              />
            )}
            {indicator === "line" && (
              <div
                className="h-1 w-3 shrink-0"
                style={{
                  backgroundColor: color,
                }}
              />
            )}
            <div className="grid flex-1 grid-cols-2 items-center gap-2">
              <span className="text-muted-foreground">{configEntry.label}</span>
              <span className="font-bold">{value}</span>
            </div>
          </div>
        )
      })

    return (
      <ChartTooltip
        ref={ref}
        className={cn("tabular-nums", className)}
        {...props}
      >
        {!hideLabel && <div className="font-bold">{label}</div>}
        <div className="grid gap-1">{itemContent}</div>
      </ChartTooltip>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

// Legend
const ChartLegend = typedForwardRef(
  ({ className, ...props }, ref) => {
    const { config } = useChart()

    return (
      "payload" in props &&
      props.payload &&
      props.payload.length > 0 && (
        <div ref={ref} className={cn(CHART_STYLES.legend, className)} {...props}>
          {props.payload.map((item) => {
            const { dataKey, color } = item
            const configEntry = config[dataKey]

            return (
              <div
                key={`legend-item-${dataKey}`}
                className={CHART_STYLES.legendItem}
              >
                <div
                  className={CHART_STYLES.legendIcon}
                  style={{
                    backgroundColor: color,
                  }}
                />
                <span className="text-muted-foreground">
                  {configEntry.label}
                </span>
              </div>
            )
          })}
        </div>
      )
    )
  }
)
ChartLegend.displayName = "ChartLegend"

// Export all components
export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartContext,
  useChart,
}

import { cn } from "@/lib/utils"
import { memo } from "react"

/**
 * @description A card to show when there is an error.
 * @copyright ARITS Limited
 * @author Emran
 * ([@emranffl](https://www.linkedin.com/in/emranffl/))
 */

const ErrorCard = ({
  className,
  text,
  image,
}: {
  className?: string
  text?: {
    className?: string
    value?: string
  }
  image?: {
    className?: string
    // src?: string;
    width?: number
    height?: number
  } | null
}) => {
  const mergedTextProps = {
    value: "Something went wrong, please try again later.",
    ...text,
  }

  const mergedImageProps = {
    // src: error,
    width: 40,
    height: 40,
    // priority: true,
    ...image,
  } as const

  return (
    <div
      className={cn(
        "flex grow flex-col flex-wrap items-center justify-center space-y-16 rounded border px-12 py-16 shadow-sm",
        className,
      )}
    >
      {/* {image !== null && <Image alt="error" {...mergedImageProps} />} */}
      {image !== null && (
        <>
          <svg
            width={mergedImageProps.width === undefined ? "305" : mergedImageProps.width.toString()}
            height={
              mergedImageProps.height === undefined ? "212" : mergedImageProps.height.toString()
            }
            viewBox="0 0 305 212"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-rose-400", mergedImageProps.className)}
          >
            <path
              d="M234.02 201.313L74.5634 201.368C66.5527 201.371 59.377 197.231 55.3692 190.295C53.3651 186.826 52.3628 183.022 52.3615 179.216C52.3601 175.411 53.3603 171.605 55.3615 168.135L135.039 23.0862C139.043 16.1469 146.216 12.0028 154.226 12C162.237 11.9972 169.413 16.1364 173.421 23.073L253.21 168.085C255.208 171.544 256.208 175.345 256.209 179.148C256.208 182.951 255.209 186.757 253.207 190.227C249.204 197.165 242.031 201.31 234.02 201.313ZM54.3658 179.213C54.3656 182.677 71.9611 175.213 73.784 178.368C77.4302 184.678 67.2747 199.37 74.5628 199.368C74.5628 199.368 247.833 195.54 251.475 189.227C253.295 186.071 254.205 182.608 254.204 179.146C254.203 175.684 253.291 172.223 251.467 169.067L171.679 24.0555C168.043 17.7633 161.515 13.9975 154.227 14C146.942 14.0025 54.3661 175.749 54.3658 179.213Z"
              fill="#3F3D56"
            />
            <path
              d="M200.756 169.324C241.072 169.324 273.756 136.641 273.756 96.3242C273.756 56.0074 241.072 23.3242 200.756 23.3242C160.439 23.3242 127.756 56.0074 127.756 96.3242C127.756 136.641 160.439 169.324 200.756 169.324Z"
              fill="#f43f5e"
            />
            <path
              d="M200.769 141.074C204.471 141.074 207.471 138.073 207.471 134.372C207.471 130.67 204.471 127.669 200.769 127.669C197.067 127.669 194.066 130.67 194.066 134.372C194.066 138.073 197.067 141.074 200.769 141.074Z"
              fill="white"
            />
            <path
              d="M200.74 51.5742C200.124 55.6654 201.228 56.5215 201.234 74.1593C201.24 91.7971 204.899 115.445 200.762 115.446C196.625 115.448 195.112 66.6437 180.745 62.3243C163.855 57.2458 202.733 38.3302 200.74 51.5742Z"
              fill="white"
            />
            <path
              d="M102.779 133.595L96.1839 147.53C104.157 141.813 116.611 136.884 126.521 134.245C117.287 129.784 105.988 122.593 99.238 115.473L103.031 130.197C58.5574 121.138 26.62 87.0203 26.6065 47.9377L25 47.385C25.0141 88.2078 56.5097 124.346 102.779 133.595Z"
              fill="#f43f5e"
            />
          </svg>
        </>
      )}

      <p className={cn("text-sm text-rose-400", mergedTextProps.className)}>
        {mergedTextProps.value}
      </p>
    </div>
  )
}

export default memo(ErrorCard)

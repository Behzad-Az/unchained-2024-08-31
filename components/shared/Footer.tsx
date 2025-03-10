import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row xl:px-5">
        <Link href="/">
          <Image src="/assets/images/logo-21re.svg" alt="logo" width={128} height={38} />
        </Link>
        <p>2023 21.R.E. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
import Link from "gt-next/link";

const Header = () => (
    <header className="container flex w-full items-center justify-between">
        <Link
            className="underline-offset-1 hover:underline hover:opacity-80"
            href="/"
        >
            <span className="text-muted-foreground text-sm font-medium md:text-base">
                @gsmt
            </span>
        </Link>
    </header>
);

export { Header };

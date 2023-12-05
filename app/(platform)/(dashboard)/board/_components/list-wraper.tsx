interface ListWraperProps {
  children: React.ReactNode;
}

export const ListWraper = ({ children }: ListWraperProps) => {
  return <li className="shrink-0 h-full w-[272px] select-none">{children}</li>;
};

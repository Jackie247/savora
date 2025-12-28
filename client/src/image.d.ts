// This is used to enable TypeScript to work with SVG, specifically this error: error TS2322: Type 'string' is not assignable to type 'ComponentType<SVGProps<SVGSVGElement>>'
declare module "*.svg" {
    const content: string;
    export default content;
}